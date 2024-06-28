import { ExifTags, TiffTags, GPSTags, StringValues } from './tags';
import {
  EXIF_IFD,
  EXIF_TAGS,
  ExiflyOpts,
  GPS_INFO_IFD,
  ZEROTH_IFD,
} from './typings';

/**
 *  Based on https://github.com/exif-heic-js/exif-heic-js
 *  MIT License

    Copyright (c) 2019 Jim Liu

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */
export default class Exifly {
  public buf: ArrayBufferLike;
  public opts: ExiflyOpts;

  constructor(buf: ArrayBufferLike, opts?: Partial<ExiflyOpts>) {
    this.buf = buf;
    this.opts = Object.create(null);
    this.opts.debug = opts?.debug ?? false;
  }

  private readTags(
    file: DataView,
    tiffStart: number,
    dirStart: number,
    strings: Record<number, EXIF_IFD | ZEROTH_IFD | GPS_INFO_IFD>,
    bigEnd: boolean,
  ) {
    let entries = file.getUint16(dirStart, !bigEnd),
      // @ts-ignore
      tags: Record<
        EXIF_IFD | ZEROTH_IFD | GPS_INFO_IFD,
        string | number | Number | Number[] | undefined
      > = {},
      entryOffset,
      tag,
      i;

    for (i = 0; i < entries; i++) {
      entryOffset = dirStart + i * 12 + 2;
      tag = strings[file.getUint16(entryOffset, !bigEnd)];
      if (!tag && this.opts.debug)
        console.log('Unknown tag: ' + file.getUint16(entryOffset, !bigEnd));
      tags[tag] = this.readTagValue(
        file,
        entryOffset,
        tiffStart,
        dirStart,
        bigEnd,
      );
    }
    return tags;
  }

  private readTagValue(
    file: DataView,
    entryOffset: number,
    tiffStart: number,
    dirStart: number,
    bigEnd: boolean,
  ) {
    let type = file.getUint16(entryOffset + 2, !bigEnd),
      numValues = file.getUint32(entryOffset + 4, !bigEnd),
      valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
      offset,
      vals,
      val,
      numerator,
      denominator;

    switch (type) {
      case 1: // byte, 8-bit unsigned int
      case 7: // undefined, 8-bit byte, value depending on field
        if (numValues == 1) {
          return file.getUint8(entryOffset + 8);
        } else {
          offset = numValues > 4 ? valueOffset : entryOffset + 8;
          vals = [];
          for (let n = 0; n < numValues; n++) {
            vals[n] = file.getUint8(offset + n);
          }
          return vals;
        }

      case 2: // ascii, 8-bit byte
        offset = numValues > 4 ? valueOffset : entryOffset + 8;
        return this.getStringFromDB(file, offset, numValues - 1);

      case 3: // short, 16 bit int
        if (numValues == 1) {
          return file.getUint16(entryOffset + 8, !bigEnd);
        } else {
          offset = numValues > 2 ? valueOffset : entryOffset + 8;
          vals = [];
          for (let n = 0; n < numValues; n++) {
            vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
          }
          return vals;
        }

      case 4: // long, 32 bit int
        if (numValues == 1) {
          return file.getUint32(entryOffset + 8, !bigEnd);
        } else {
          vals = [];
          for (let n = 0; n < numValues; n++) {
            vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
          }
          return vals;
        }

      case 5: // rational = two long values, first is numerator, second is denominator
        if (numValues == 1) {
          numerator = file.getUint32(valueOffset, !bigEnd);
          denominator = file.getUint32(valueOffset + 4, !bigEnd);
          val = new Number(numerator / denominator);
          // @ts-ignore
          val.numerator = numerator;
          // @ts-ignore
          val.denominator = denominator;
          return val;
        } else {
          vals = [];
          for (let n = 0; n < numValues; n++) {
            numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
            denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
            vals[n] = new Number(numerator / denominator);
            // @ts-ignore
            vals[n].numerator = numerator;
            // @ts-ignore
            vals[n].denominator = denominator;
          }
          return vals;
        }

      case 9: // slong, 32 bit signed int
        if (numValues == 1) {
          return file.getInt32(entryOffset + 8, !bigEnd);
        } else {
          vals = [];
          for (let n = 0; n < numValues; n++) {
            vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
          }
          return vals;
        }

      case 10: // signed rational, two slongs, first is numerator, second is denominator
        if (numValues == 1) {
          return (
            file.getInt32(valueOffset, !bigEnd) /
            file.getInt32(valueOffset + 4, !bigEnd)
          );
        } else {
          vals = [];
          for (let n = 0; n < numValues; n++) {
            vals[n] =
              file.getInt32(valueOffset + 8 * n, !bigEnd) /
              file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
          }
          return vals;
        }
    }
  }

  private getStringFromDB(buffer: DataView, start: number, length: number) {
    let outstr = '';
    for (let n = start; n < start + length; n++) {
      outstr += String.fromCharCode(buffer.getUint8(n));
    }
    return outstr;
  }

  private readEXIFData(file: DataView, start: number) {
    let bigEnd, tags, tag, exifData, gpsData;

    // test for TIFF validity and endianness
    if (file.getUint16(start) == 0x4949) {
      bigEnd = false;
    } else if (file.getUint16(start) == 0x4d4d) {
      bigEnd = true;
    } else {
      if (this.opts.debug)
        console.log('Not valid TIFF data! (no 0x4949 or 0x4D4D)');
      return false;
    }

    if (file.getUint16(start + 2, !bigEnd) != 0x002a) {
      if (this.opts.debug) console.log('Not valid TIFF data! (no 0x002A)');
      return false;
    }

    const firstIFDOffset = file.getUint32(start + 4, !bigEnd);

    if (firstIFDOffset < 0x00000008) {
      if (this.opts.debug)
        console.log('Not valid TIFF data! (First offset less than 8)');
      return false;
    }

    tags = this.readTags(file, start, start + firstIFDOffset, TiffTags, bigEnd);

    if (tags['Exif IFD Pointer']) {
      exifData = this.readTags(
        file,
        start,
        start + (tags['Exif IFD Pointer'] as number),
        ExifTags,
        bigEnd,
      );
      for (tag in exifData) {
        switch (tag) {
          case EXIF_TAGS.EXIF_IFD.LightSource:
          case EXIF_TAGS.EXIF_IFD.Flash:
          case EXIF_TAGS.EXIF_IFD.MeteringMode:
          case EXIF_TAGS.EXIF_IFD.ExposureProgram:
          case EXIF_TAGS.EXIF_IFD.SensingMethod:
          case EXIF_TAGS.EXIF_IFD.SceneCaptureType:
          case EXIF_TAGS.EXIF_IFD.SceneType:
          case EXIF_TAGS.EXIF_IFD.CustomRendered:
          case EXIF_TAGS.EXIF_IFD.WhiteBalance:
          case EXIF_TAGS.EXIF_IFD.GainControl:
          case EXIF_TAGS.EXIF_IFD.Contrast:
          case EXIF_TAGS.EXIF_IFD.Saturation:
          case EXIF_TAGS.EXIF_IFD.Sharpness:
          case EXIF_TAGS.EXIF_IFD.SubjectDistanceRange:
          case EXIF_TAGS.EXIF_IFD.FileSource:
            // @ts-ignore
            exifData[tag] = StringValues[tag][exifData[tag]];
            break;

          case EXIF_TAGS.EXIF_IFD.ExifVersion:
          case EXIF_TAGS.EXIF_IFD.FlashpixVersion:
            // @ts-ignore
            exifData[tag] = String.fromCharCode(
              // @ts-ignore
              exifData[tag][0],
              // @ts-ignore
              exifData[tag][1],
              // @ts-ignore
              exifData[tag][2],
              // @ts-ignore
              exifData[tag][3],
            );
            break;

          case EXIF_TAGS.EXIF_IFD.ComponentsConfiguration:
            exifData[tag] =
              // @ts-ignore
              StringValues.Components[exifData[tag][0]] +
              // @ts-ignore
              StringValues.Components[exifData[tag][1]] +
              // @ts-ignore
              StringValues.Components[exifData[tag][2]] +
              // @ts-ignore
              StringValues.Components[exifData[tag][3]];
            break;
        }
        // @ts-ignore
        tags[tag] = exifData[tag];
      }
    }

    if (tags['GPS Info IFD Pointer']) {
      gpsData = this.readTags(
        file,
        start,
        start + (tags['GPS Info IFD Pointer'] as number),
        GPSTags,
        bigEnd,
      );
      for (tag in gpsData) {
        switch (tag) {
          case EXIF_TAGS.GPS_INFO_IFD.GPSVersionID:
            // @ts-ignore
            gpsData[tag] =
              // @ts-ignore
              gpsData[tag][0] +
              '.' +
              // @ts-ignore
              gpsData[tag][1] +
              '.' +
              // @ts-ignore
              gpsData[tag][2] +
              '.' +
              // @ts-ignore
              gpsData[tag][3];
            break;
        }
        // @ts-ignore
        tags[tag] = gpsData[tag];
      }
    }

    return tags;
  }

  //Based on HEIC format decoded via https://github.com/exiftool/exiftool
  heic() {
    const dataView = new DataView(this.buf);
    const ftypeSize = dataView.getUint32(0); // size of ftype box
    const metadataSize = dataView.getUint32(ftypeSize); //size of metadata box

    //Scan through metadata until we find (a) Exif, (b) iloc
    let exifOffset = -1;
    let ilocOffset = -1;
    for (let i = ftypeSize; i < metadataSize + ftypeSize; i++) {
      if (this.getStringFromDB(dataView, i, 4) == 'Exif') {
        exifOffset = i;
      } else if (this.getStringFromDB(dataView, i, 4) == 'iloc') {
        ilocOffset = i;
      }
    }

    if (exifOffset == -1 || ilocOffset == -1) {
      return null;
    }

    const exifItemIndex = dataView.getUint16(exifOffset - 4);

    //Scan through ilocs to find exif item location
    for (let i = ilocOffset + 12; i < metadataSize + ftypeSize; i += 16) {
      const itemIndex = dataView.getUint16(i);
      if (itemIndex == exifItemIndex) {
        const exifLocation = dataView.getUint32(i + 8);
        const exifSize = dataView.getUint32(i + 12);
        //Check prefix at exif exifOffset
        const prefixSize = 4 + dataView.getUint32(exifLocation);
        exifOffset = exifLocation + prefixSize;

        return this.readEXIFData(dataView, exifOffset);
      }
    }

    return null;
  }

  /**
   * @alias jpg
   */
  jpeg() {
    const data = this.buf;
    const dataView = new DataView(data);
    if (dataView.getUint8(0) != 0xff || dataView.getUint8(1) != 0xd8) {
      if (this.opts.debug) console.log('Not a valid JPEG');
      return false; // not a valid jpeg
    }
    let offset = 2,
      length = data.byteLength,
      marker;
    while (offset < length) {
      if (dataView.getUint8(offset) != 0xff) {
        if (this.opts.debug)
          console.log(
            'Not a valid marker at offset ' +
              offset +
              ', found: ' +
              dataView.getUint8(offset),
          );
        return false; // not a valid marker, something is wrong
      }
      marker = dataView.getUint8(offset + 1);
      if (this.opts.debug) console.log(marker);
      // we could implement handling for other markers here,
      // but we're only looking for 0xFFE1 for EXIF data
      if (marker == 225) {
        if (this.opts.debug) console.log('Found 0xFFE1 marker');
        return this.readEXIFData(dataView, offset + 4 + 6);
      } else {
        offset += 2 + dataView.getUint16(offset + 2);
      }
    }
  }

  jpg() {
    return this.jpeg();
  }

  raw() {
    // TODO
    const data = this.buf;
    console.log(data);
  }
}
