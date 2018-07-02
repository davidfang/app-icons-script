/*
	Photoshop script to generate all ANDROID App Icon PNGs
	https://github.com/jessesquires/iOS-icons-script

	See included README and LICENSE for details.

	Modifications
		Copyright (c) 2014 Jesse Squires
		Copyright (c) 2012 Josh Jones

	Copyright (c) 2010 Matt Di Pasquale
*/

//	Turn debugger on
//	0 is off.
// 	$.level = 1;

var initialPrefs = app.preferences.rulerUnits;

function main() {
	//	prompt user to select source file, cancel returns null
	var sourceFile = File.openDialog("Select a 1:1 sqaure PNG file that is at least 1024x1024.", "*.png", false);
	if (sourceFile == null)  {
		// user canceled
		return;
	}

	var doc = open(sourceFile, OpenDocumentType.PNG);
	if (doc == null) {
		alert("Oh shit!\nSomething is wrong with the file. Make sure it is a valid PNG file.");
		return;
	}

	app.preferences.rulerUnits = Units.PIXELS;

	if (doc.width != doc.height || doc.width < 1024 || doc.height < 1024) {
		alert("What the fuck is this?!\nImage failed validation. Please select a 1:1 sqaure PNG file that is at least 1024x1024.");
		restorePrefs();
		return;
	}

	//	folder selection dialog
	var destFolder = Folder.selectDialog("Choose an output folder.\n*** Warning! ***\nThis will overwrite any existing files with the same name in this folder.");
	if (destFolder == null) {
		// user canceled
		restorePrefs();
		return;
	}

	//	save icons in PNG-24 using Save for Web
	var saveForWeb = new ExportOptionsSaveForWeb();
	saveForWeb.format = SaveDocumentType.PNG;
	saveForWeb.PNG8 = true;
	saveForWeb.transparency = true;

	//	delete metadata
	doc.info = null;

	var icons = [
		// IOS ICON
		{"name": "iTunesArtwork@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":1024},
		{"name": "iTunesArtwork","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":512},

		{"name": "Icon-1024@1x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":1024},

		{"name": "Icon-29","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":29},
		{"name": "Icon-29@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":58},
		{"name": "Icon-29@3x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":87},

        {"name": "Icon-20","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":20},
        {"name": "Icon-20@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":40},
        {"name": "Icon-20@3x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":60},

		{"name": "Icon-40","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":40},
		{"name": "Icon-40@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":80},
		{"name": "Icon-40@3x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":120},

		{"name": "Icon-50","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":50},
		{"name": "Icon-50@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":100},

		{"name": "Icon-57","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":57},
		{"name": "Icon-57@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":114},

		{"name": "Icon-60@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":120},
		{"name": "Icon-60@3x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":180},

		{"name": "Icon-72","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":72},
		{"name": "Icon-72@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":144},

		{"name": "Icon-76","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":76},
		{"name": "Icon-76@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":152},

		{"name": "Icon-120","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":120},

		{"name": "Icon-83-5@2x","dir":"/ios/Assets.xcassets/AppIcon.appiconset", "size":167},

		// ANDROID ICON
		{"name": "ic_launcher","dir":"/android/mipmap-ldpi", "size":36},
		{"name": "ic_launcher","dir":"/android/mipmap-mdpi", "size":48},
		{"name": "ic_launcher","dir":"/android/mipmap-hdpi", "size":72},
		{"name": "ic_launcher","dir":"/android/mipmap-xhdpi", "size":96},
		{"name": "ic_launcher","dir":"/android/mipmap-xxhdpi", "size":144},
		{"name": "ic_launcher","dir":"/android/mipmap-xxxhdpi", "size":192},
	];

	var initialState = doc.activeHistoryState;
	
	// 创建FileSystemObject对象实例
	var fso = Folder(destFolder + "/ios")
    // 创建新文件夹
    if(!fso.exists) fso.create()
	fso = Folder(destFolder + "/ios/Assets.xcassets")
    if(!fso.exists) fso.create()
	fso = Folder(destFolder + "/ios/Assets.xcassets/AppIcon.appiconset")
    if(!fso.exists) fso.create() 

    fso = Folder(destFolder + "/android")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-ldpi")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-mdpi")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-hdpi")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-xhdpi")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-xxhdpi")
    if(!fso.exists) fso.create()
    fso = Folder(destFolder + "/android/mipmap-xxxhdpi")
    if(!fso.exists) fso.create()
    
    
	for (var i = 0; i < icons.length; i++) {
		var eachIcon = icons[i];

		doc.resizeImage(eachIcon.size, eachIcon.size, null, ResampleMethod.BICUBICSHARPER);

		var destFileName = eachIcon.name + ".png";

		if (eachIcon.name == "iTunesArtwork@2x" || eachIcon.name == "iTunesArtwork") {
			// iTunesArtwork files don't have an extension
			destFileName = eachIcon.name;
		}

		doc.exportDocument(new File(destFolder + eachIcon.dir + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

		// undo resize
		doc.activeHistoryState = initialState;
	}

	alert("Success!\nAll iOS icons created and saved. Fuck yeah. 🎉 🍺");

	doc.close(SaveOptions.DONOTSAVECHANGES);

	restorePrefs();
}

function restorePrefs() {
	app.preferences.rulerUnits = initialPrefs;
}

main();

