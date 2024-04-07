# Exifly

An ES modules implementation based on [exif-heic-js](https://github.com/exif-heic-js/exif-heic-js) to get EXIF of an image. 

## Example
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exifly</title>
</head>

<body>
    <div>
        <input type="file" id="image" accept=".heic,.jpeg,.jpg" />
    </div>
    <div>
        <pre id="tags"></pre>
    </div>
    <script src="../dist/exifly.umd.js"></script>
    <script>
        document.getElementById("image").onchange = function (e) {
            let extension = e.target.files[0].name.toLowerCase().split('.').at(-1);
            let reader = new FileReader();

            reader.onload = function () {
                const exifly = new Exifly.load(reader.result);
                if (extension === 'heic') {
                    tags = exifly.heic()
                } else if (extension === 'jpg' || extension === 'jpeg') {
                    tags = exifly.jpeg();
                } else {
                    tags = exifly.raw();
                }
                console.log(tags)
                document.getElementById('tags').textContent = JSON.stringify(tags, null, 2);
            };

            reader.readAsArrayBuffer(e.target.files[0]);
        }
    </script>
</body>

</html>
```
