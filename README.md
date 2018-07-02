# iOS-icons-script

*Photoshop script to generate all iOS App Icon PNGs*

Make one 1024x1024 App Icon, let this script [automate](http://xkcd.com/1319/) the rest.

This script will create all of your app icon images from a single 1024x1024 "iTunesArtwork" PNG. It saves icons in **PNG-24** using *Save For Web* and removes metadata. The generated PNGs are named with the following scheme: `Icon-<size><density>.png`, for example `Icon-60@2x.png`.

## Installation

**Open `Terminal.app` and type the following like a badass:**
```bash
$ git clone https://github.com/jessesquires/iOS-icons-script.git
$ cd iOS-icons-script/
$ ./install.sh
```
**Or, do some manual shit:**

1. Download script
2. Copy `Create-iOS-icons.jsx` to `/Applications/Adobe Photoshop CC 2014/Presets/Scripts/`

## Usage

1. Open Photoshop CC 2014 (may require restart if open during install)
2. Select File > Scripts > Create-Ios-Android-icons
3. Follow the dialog prompts
4. :tada: :beer:
5.  对应生成android和ios文件夹，将android文件夹下的放在对应的目录下即可

## Warning!

This script does not handle naming collisions, it will overwrite any existing files with the same names in the destination directory.

## Documentation

* Adobe [Photoshop JavaScript Reference](http://www.adobe.com/devnet/photoshop/scripting.html)

* Apple iOS Human Interface Guidelines, [Icon and Image Sizes](https://developer.apple.com/library/ios/documentation/userexperience/conceptual/mobilehig/IconMatrix.html)

## Credits

Modified and maintained by [@jessesquires](https://github.com/jessesquires)

Original [script](https://gist.github.com/mattdipasquale/711203) by [@mattdipasquale](https://github.com/mattdipasquale)

Later [modified](https://gist.github.com/appsbynight/3681050) by [@appsbynight](https://github.com/appsbynight)
