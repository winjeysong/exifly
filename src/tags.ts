import { EXIF_TAGS } from './typings';

export const ExifTags = {
  // version tags
  0x9000: EXIF_TAGS.EXIF_IFD['ExifVersion'], // EXIF version
  0xa000: EXIF_TAGS.EXIF_IFD['FlashpixVersion'], // Flashpix format version

  // colorspace tags
  0xa001: EXIF_TAGS.EXIF_IFD['ColorSpace'], // Color space information tag

  // image configuration
  0xa002: EXIF_TAGS.EXIF_IFD['PixelXDimension'], // Valid width of meaningful image
  0xa003: EXIF_TAGS.EXIF_IFD['PixelYDimension'], // Valid height of meaningful image
  0x9101: EXIF_TAGS.EXIF_IFD['ComponentsConfiguration'], // Information about channels
  0x9102: EXIF_TAGS.EXIF_IFD['CompressedBitsPerPixel'], // Compressed bits per pixel

  // user information
  0x927c: EXIF_TAGS.EXIF_IFD['MakerNote'], // Any desired information written by the manufacturer
  0x9286: EXIF_TAGS.EXIF_IFD['UserComment'], // Comments by user

  // related file
  0xa004: EXIF_TAGS.EXIF_IFD['RelatedSoundFile'], // Name of related sound file

  // date and time
  0x9003: EXIF_TAGS.EXIF_IFD['DateTimeOriginal'], // Date and time when the original image was generated
  0x9004: EXIF_TAGS.EXIF_IFD['DateTimeDigitized'], // Date and time when the image was stored digitally
  0x9290: EXIF_TAGS.EXIF_IFD['SubSecTime'], // Fractions of seconds for DateTime
  0x9291: EXIF_TAGS.EXIF_IFD['SubSecTimeOriginal'], // Fractions of seconds for DateTimeOriginal
  0x9292: EXIF_TAGS.EXIF_IFD['SubSecTimeDigitized'], // Fractions of seconds for DateTimeDigitized

  // picture-taking conditions
  0x829a: EXIF_TAGS.EXIF_IFD['ExposureTime'], // Exposure time (in seconds)
  0x829d: EXIF_TAGS.EXIF_IFD['FNumber'], // F number
  0x8822: EXIF_TAGS.EXIF_IFD['ExposureProgram'], // Exposure program
  0x8824: EXIF_TAGS.EXIF_IFD['SpectralSensitivity'], // Spectral sensitivity
  0x8827: EXIF_TAGS.EXIF_IFD['PhotographicSensitivity'], // ISO speed rating
  0x8828: EXIF_TAGS.EXIF_IFD['OECF'], // Optoelectric conversion factor
  0x9201: EXIF_TAGS.EXIF_IFD['ShutterSpeedValue'], // Shutter speed
  0x9202: EXIF_TAGS.EXIF_IFD['ApertureValue'], // Lens aperture
  0x9203: EXIF_TAGS.EXIF_IFD['BrightnessValue'], // Value of brightness
  0x9204: EXIF_TAGS.EXIF_IFD['ExposureBiasValue'], // Exposure bias
  0x9205: EXIF_TAGS.EXIF_IFD['MaxApertureValue'], // Smallest F number of lens
  0x9206: EXIF_TAGS.EXIF_IFD['SubjectDistance'], // Distance to subject in meters
  0x9207: EXIF_TAGS.EXIF_IFD['MeteringMode'], // Metering mode
  0x9208: EXIF_TAGS.EXIF_IFD['LightSource'], // Kind of light source
  0x9209: EXIF_TAGS.EXIF_IFD['Flash'], // Flash status
  0x9214: EXIF_TAGS.EXIF_IFD['SubjectArea'], // Location and area of main subject
  0x920a: EXIF_TAGS.EXIF_IFD['FocalLength'], // Focal length of the lens in mm
  0xa20b: EXIF_TAGS.EXIF_IFD['FlashEnergy'], // Strobe energy in BCPS
  0xa20c: EXIF_TAGS.EXIF_IFD['SpatialFrequencyResponse'], //
  0xa20e: EXIF_TAGS.EXIF_IFD['FocalPlaneXResolution'], // Number of pixels in width direction per FocalPlaneResolutionUnit
  0xa20f: EXIF_TAGS.EXIF_IFD['FocalPlaneYResolution'], // Number of pixels in height direction per FocalPlaneResolutionUnit
  0xa210: EXIF_TAGS.EXIF_IFD['FocalPlaneResolutionUnit'], // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
  0xa214: EXIF_TAGS.EXIF_IFD['SubjectLocation'], // Location of subject in image
  0xa215: EXIF_TAGS.EXIF_IFD['ExposureIndex'], // Exposure index selected on camera
  0xa217: EXIF_TAGS.EXIF_IFD['SensingMethod'], // Image sensor type
  0xa300: EXIF_TAGS.EXIF_IFD['FileSource'], // Image source (3 == DSC)
  0xa301: EXIF_TAGS.EXIF_IFD['SceneType'], // Scene type (1 == directly photographed)
  0xa302: EXIF_TAGS.EXIF_IFD['CFAPattern'], // Color filter array geometric pattern
  0xa401: EXIF_TAGS.EXIF_IFD['CustomRendered'], // Special processing
  0xa402: EXIF_TAGS.EXIF_IFD['ExposureMode'], // Exposure mode
  0xa403: EXIF_TAGS.EXIF_IFD['WhiteBalance'], // 1 = auto white balance, 2 = manual
  0xa404: EXIF_TAGS.EXIF_IFD['DigitalZoomRation'], // Digital zoom ratio
  0xa405: EXIF_TAGS.EXIF_IFD['FocalLengthIn35mmFilm'], // Equivalent foacl length assuming 35mm film camera (in mm)
  0xa406: EXIF_TAGS.EXIF_IFD['SceneCaptureType'], // Type of scene
  0xa407: EXIF_TAGS.EXIF_IFD['GainControl'], // Degree of overall image gain adjustment
  0xa408: EXIF_TAGS.EXIF_IFD['Contrast'], // Direction of contrast processing applied by camera
  0xa409: EXIF_TAGS.EXIF_IFD['Saturation'], // Direction of saturation processing applied by camera
  0xa40a: EXIF_TAGS.EXIF_IFD['Sharpness'], // Direction of sharpness processing applied by camera
  0xa40b: EXIF_TAGS.EXIF_IFD['DeviceSettingDescription'], //
  0xa40c: EXIF_TAGS.EXIF_IFD['SubjectDistanceRange'], // Distance to subject

  // other tags
  0xa005: EXIF_TAGS.ZEROTH_IFD['InteroperabilityIFDPointer'],
  0xa420: EXIF_TAGS.EXIF_IFD['ImageUniqueID'], // Identifier assigned uniquely to each image

  // Lens info
  0xa432: EXIF_TAGS.EXIF_IFD['LensSpecification'],
  0xa433: EXIF_TAGS.EXIF_IFD['LensMake'],
  0xa434: EXIF_TAGS.EXIF_IFD['LensModel'],
  0xa435: EXIF_TAGS.EXIF_IFD['LensSerialNumber'],
};
export const TiffTags = {
  0x0100: EXIF_TAGS.ZEROTH_IFD['ImageWidth'],
  0x0101: EXIF_TAGS.ZEROTH_IFD['ImageLength'],
  0x8769: EXIF_TAGS.ZEROTH_IFD['ExifIFDPointer'],
  0x8825: EXIF_TAGS.ZEROTH_IFD['GPSInfoIFDPointer'],
  0xa005: EXIF_TAGS.ZEROTH_IFD['InteroperabilityIFDPointer'],
  0x0102: EXIF_TAGS.ZEROTH_IFD['BitsPerSample'],
  0x0103: EXIF_TAGS.ZEROTH_IFD['Compression'],
  0x0106: EXIF_TAGS.ZEROTH_IFD['PhotometricInterpretation'],
  0x0112: EXIF_TAGS.ZEROTH_IFD['Orientation'],
  0x0115: EXIF_TAGS.ZEROTH_IFD['SamplesPerPixel'],
  0x011c: EXIF_TAGS.ZEROTH_IFD['PlanarConfiguration'],
  0x0212: EXIF_TAGS.ZEROTH_IFD['YCbCrSubSampling'],
  0x0213: EXIF_TAGS.ZEROTH_IFD['YCbCrPositioning'],
  0x011a: EXIF_TAGS.ZEROTH_IFD['XResolution'],
  0x011b: EXIF_TAGS.ZEROTH_IFD['YResolution'],
  0x0128: EXIF_TAGS.ZEROTH_IFD['ResolutionUnit'],
  0x0111: EXIF_TAGS.ZEROTH_IFD['StripOffsets'],
  0x0116: EXIF_TAGS.ZEROTH_IFD['RowsPerStrip'],
  0x0117: EXIF_TAGS.ZEROTH_IFD['StripByteCounts'],
  0x0201: EXIF_TAGS.ZEROTH_IFD['JPEGInterchangeFormat'],
  0x0202: EXIF_TAGS.ZEROTH_IFD['JPEGInterchangeFormatLength'],
  0x012d: EXIF_TAGS.ZEROTH_IFD['TransferFunction'],
  0x013e: EXIF_TAGS.ZEROTH_IFD['WhitePoint'],
  0x013f: EXIF_TAGS.ZEROTH_IFD['PrimaryChromaticities'],
  0x0211: EXIF_TAGS.ZEROTH_IFD.YcbCrCoefficients,
  0x0214: EXIF_TAGS.ZEROTH_IFD['ReferenceBlackWhite'],
  0x0132: EXIF_TAGS.ZEROTH_IFD['DateTime'],
  0x010e: EXIF_TAGS.ZEROTH_IFD['ImageDescription'],
  0x010f: EXIF_TAGS.ZEROTH_IFD['Make'],
  0x0110: EXIF_TAGS.ZEROTH_IFD['Model'],
  0x0131: EXIF_TAGS.ZEROTH_IFD['Software'],
  0x013b: EXIF_TAGS.ZEROTH_IFD['Artist'],
  0x8298: EXIF_TAGS.ZEROTH_IFD['Copyright'],
};

export const GPSTags = {
  0x0000: EXIF_TAGS.GPS_INFO_IFD['GPSVersionID'],
  0x0001: EXIF_TAGS.GPS_INFO_IFD['GPSLatitudeRef'],
  0x0002: EXIF_TAGS.GPS_INFO_IFD['GPSLatitude'],
  0x0003: EXIF_TAGS.GPS_INFO_IFD['GPSLongitudeRef'],
  0x0004: EXIF_TAGS.GPS_INFO_IFD['GPSLongitude'],
  0x0005: EXIF_TAGS.GPS_INFO_IFD['GPSAltitudeRef'],
  0x0006: EXIF_TAGS.GPS_INFO_IFD['GPSAltitude'],
  0x0007: EXIF_TAGS.GPS_INFO_IFD['GPSTimeStamp'],
  0x0008: EXIF_TAGS.GPS_INFO_IFD['GPSSatellites'],
  0x0009: EXIF_TAGS.GPS_INFO_IFD['GPSStatus'],
  0x000a: EXIF_TAGS.GPS_INFO_IFD['GPSMeasureMode'],
  0x000b: EXIF_TAGS.GPS_INFO_IFD['GPSDOP'],
  0x000c: EXIF_TAGS.GPS_INFO_IFD['GPSSpeedRef'],
  0x000d: EXIF_TAGS.GPS_INFO_IFD['GPSSpeed'],
  0x000e: EXIF_TAGS.GPS_INFO_IFD['GPSTrackRef'],
  0x000f: EXIF_TAGS.GPS_INFO_IFD['GPSTrack'],
  0x0010: EXIF_TAGS.GPS_INFO_IFD['GPSImgDirectionRef'],
  0x0011: EXIF_TAGS.GPS_INFO_IFD['GPSImgDirection'],
  0x0012: EXIF_TAGS.GPS_INFO_IFD['GPSMapDatum'],
  0x0013: EXIF_TAGS.GPS_INFO_IFD['GPSDestLatitudeRef'],
  0x0014: EXIF_TAGS.GPS_INFO_IFD['GPSDestLatitude'],
  0x0015: EXIF_TAGS.GPS_INFO_IFD['GPSDestLongitudeRef'],
  0x0016: EXIF_TAGS.GPS_INFO_IFD['GPSDestLongitude'],
  0x0017: EXIF_TAGS.GPS_INFO_IFD['GPSDestBearingRef'],
  0x0018: EXIF_TAGS.GPS_INFO_IFD['GPSDestBearing'],
  0x0019: EXIF_TAGS.GPS_INFO_IFD['GPSDestDistanceRef'],
  0x001a: EXIF_TAGS.GPS_INFO_IFD['GPSDestDistance'],
  0x001b: EXIF_TAGS.GPS_INFO_IFD['GPSProcessingMethod'],
  0x001c: EXIF_TAGS.GPS_INFO_IFD['GPSAreaInformation'],
  0x001d: EXIF_TAGS.GPS_INFO_IFD['GPSDateStamp'],
  0x001e: EXIF_TAGS.GPS_INFO_IFD['GPSDifferential'],
};

export const StringValues = {
  ExposureProgram: {
    0: 'Not defined',
    1: 'Manual',
    2: 'Normal program',
    3: 'Aperture priority',
    4: 'Shutter priority',
    5: 'Creative program',
    6: 'Action program',
    7: 'Portrait mode',
    8: 'Landscape mode',
  },
  MeteringMode: {
    0: 'Unknown',
    1: 'Average',
    2: 'CenterWeightedAverage',
    3: 'Spot',
    4: 'MultiSpot',
    5: 'Pattern',
    6: 'Partial',
    255: 'Other',
  },
  LightSource: {
    0: 'Unknown',
    1: 'Daylight',
    2: 'Fluorescent',
    3: 'Tungsten (incandescent light)',
    4: 'Flash',
    9: 'Fine weather',
    10: 'Cloudy weather',
    11: 'Shade',
    12: 'Daylight fluorescent (D 5700 - 7100K)',
    13: 'Day white fluorescent (N 4600 - 5400K)',
    14: 'Cool white fluorescent (W 3900 - 4500K)',
    15: 'White fluorescent (WW 3200 - 3700K)',
    17: 'Standard light A',
    18: 'Standard light B',
    19: 'Standard light C',
    20: 'D55',
    21: 'D65',
    22: 'D75',
    23: 'D50',
    24: 'ISO studio tungsten',
    255: 'Other',
  },
  Flash: {
    0x0000: 'Flash did not fire',
    0x0001: 'Flash fired',
    0x0005: 'Strobe return light not detected',
    0x0007: 'Strobe return light detected',
    0x0009: 'Flash fired, compulsory flash mode',
    0x000d: 'Flash fired, compulsory flash mode, return light not detected',
    0x000f: 'Flash fired, compulsory flash mode, return light detected',
    0x0010: 'Flash did not fire, compulsory flash mode',
    0x0018: 'Flash did not fire, auto mode',
    0x0019: 'Flash fired, auto mode',
    0x001d: 'Flash fired, auto mode, return light not detected',
    0x001f: 'Flash fired, auto mode, return light detected',
    0x0020: 'No flash function',
    0x0041: 'Flash fired, red-eye reduction mode',
    0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
    0x0047: 'Flash fired, red-eye reduction mode, return light detected',
    0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
    0x004d:
      'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
    0x004f:
      'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
    0x0059: 'Flash fired, auto mode, red-eye reduction mode',
    0x005d:
      'Flash fired, auto mode, return light not detected, red-eye reduction mode',
    0x005f:
      'Flash fired, auto mode, return light detected, red-eye reduction mode',
  },
  SensingMethod: {
    1: 'Not defined',
    2: 'One-chip color area sensor',
    3: 'Two-chip color area sensor',
    4: 'Three-chip color area sensor',
    5: 'Color sequential area sensor',
    7: 'Trilinear sensor',
    8: 'Color sequential linear sensor',
  },
  SceneCaptureType: {
    0: 'Standard',
    1: 'Landscape',
    2: 'Portrait',
    3: 'Night scene',
  },
  SceneType: {
    1: 'Directly photographed',
  },
  CustomRendered: {
    0: 'Normal process',
    1: 'Custom process',
  },
  WhiteBalance: {
    0: 'Auto white balance',
    1: 'Manual white balance',
  },
  GainControl: {
    0: 'None',
    1: 'Low gain up',
    2: 'High gain up',
    3: 'Low gain down',
    4: 'High gain down',
  },
  Contrast: {
    0: 'Normal',
    1: 'Soft',
    2: 'Hard',
  },
  Saturation: {
    0: 'Normal',
    1: 'Low saturation',
    2: 'High saturation',
  },
  Sharpness: {
    0: 'Normal',
    1: 'Soft',
    2: 'Hard',
  },
  SubjectDistanceRange: {
    0: 'Unknown',
    1: 'Macro',
    2: 'Close view',
    3: 'Distant view',
  },
  FileSource: {
    3: 'DSC',
  },

  Components: {
    0: '',
    1: 'Y',
    2: 'Cb',
    3: 'Cr',
    4: 'R',
    5: 'G',
    6: 'B',
  },
};
