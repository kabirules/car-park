var mapbox = require("nativescript-mapbox");
var geolocation = require("nativescript-geolocation");
var fs = require("file-system");
var orientationModule = require("nativescript-screen-orientation");

var latitude=0;
var longitude=0;
var globalArgs;
var mapStyle=0;

function onMapReady(args) {

  orientationModule.setCurrentOrientation("portrait",function(){
    console.log("portrait orientation set");
  });

  globalArgs=args;
  // you can tap into the native MapView objects (MGLMapView for iOS and com.mapbox.mapboxsdk.maps.MapView for Android)
  //var nativeMapView = args.ios ? args.ios : args.android;
  //console.log("Mapbox onMapReady for " + (args.ios ? "iOS" : "Android") + ", native object received: " + nativeMapView);

  if (!geolocation.isEnabled()) {
    geolocation.enableLocationRequest();
  } else {
    whatchPos();
  };

  // Make sure the zoom is at 15
  globalArgs.map.setZoomLevel(
    {
      level:15, // mandatory, 0-20
      animated: true // default true
    }
  );
  // Check if there is a marker from last time.
  readMarkerFile();
};

/************************************* */
/************************************* */

exports.addMarker = function(args) {
  addMarker();
  saveMarkerFile();
};

exports.enableLoc = function(args) {
  if (!geolocation.isEnabled()) {
    alert('No GPS permission. Please reinstall the app.');
    //geolocation.enableLocationRequest(); Not working on IOS... and Android?
  } else {
    whatchPos();
  }
};

exports.changeStyle = function(args) {
  if (mapStyle==0) {
    globalArgs.map.setMapStyle(mapbox.MapStyle.SATELLITE);
    mapStyle=1;
  } else if (mapStyle==1) {
    globalArgs.map.setMapStyle(mapbox.MapStyle.SATELLITE_STREETS);
    mapStyle=2;
  } else if (mapStyle==2) {
    globalArgs.map.setMapStyle(mapbox.MapStyle.STREETS);
    mapStyle=0;
  };
  //globalArgs.map.setMapStyle(mapbox.MapStyle.DARK);
  //globalArgs.map.setMapStyle(mapbox.MapStyle.EMERALD);
}

/************************************* */
/************************************* */
/*
function whatchPos() {
  console.log(3);
  watchId = geolocation.watchLocation(
    function (loc) {
        if (loc) {
          latitude = loc.latitude;
          longitude = loc.longitude;
          globalArgs.map.setCenter(
            {
              lat: loc.latitude,
              lng: loc.longitude,
              animated: true // default true
            }
          );          
        }
    }, 
    function(e){
        console.log("Error: " + e.message);
    }, 
    {desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime : 1000 * 30});
    // every 25s... will that drain the battery?? Answer after checking: YES!
    // now we'll try with 30s
};
*/
function whatchPos() {
  var location = geolocation.getCurrentLocation({desiredAccuracy: 3}).
  then(function(loc) {
    if (loc) {
      latitude = loc.latitude;
      longitude = loc.longitude;
      globalArgs.map.setCenter(
        {
          lat: loc.latitude,
          lng: loc.longitude,
          animated: true // default true
        }
      );
    }
  }, function(e){
      console.log("Error: " + e.message);
  });
}

function saveMarkerFile() {
  var documents = fs.knownFolders.documents();
  var file = documents.getFile("marker.json");
  // Writing text to the file.
  file.writeText("{\"lat\":\""+latitude+"\", \"lon\":\""+longitude+"\"}")
    .then(function () {
      // Succeeded writing to the file.
      console.log("saveMarkerFile ok");
    }, function (error) {
      // Failed to write to the file.
      console.log("saveMarkerFile KO!");
  });  
};

function readMarkerFile() {
  var documents = fs.knownFolders.documents();
  var file = documents.getFile("marker.json");
  //Reading the file
  file.readText()
    .then(function (content) {
      var jsonObj = JSON.parse(content);
      latitude = jsonObj.lat;
      longitude = jsonObj.lon;
      addMarker();
    }, function (error) {
        // Failed to read from the file.
        console.log('No problem. Probably the file doesnt exist.')
  });  
};

function addMarker() {
  globalArgs.map.removeMarkers();
  globalArgs.map.addMarkers([
    {
      lat: latitude,
      lng: longitude,
      title: 'Here is my car!'
    }]
  );
}

exports.onMapReady = onMapReady;