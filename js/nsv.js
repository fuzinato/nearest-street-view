
var errormsg = document.getElementById("errormsg");

function getLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(getStreetView);
   } else {
       errormsg.innerHTML = "Geolocation is not supported by this browser.";
   }
}


function getStreetView(position) {
   var metr = parseInt(document.getElementById('meters').value, 10),
       location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
       svs = new google.maps.StreetViewService();
   svs.getPanoramaByLocation(location, metr, showPosition);
}

function showPosition(svData, svStatus) {
  console.log(svStatus);
  if (svStatus == 'OK') {
     errormsg.innerHTML = "";
     var panoramaOptions = {
         position: svData.location.latLng,
         pov: {
             heading: 34,
             pitch: 10
         }
     };
     var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'), panoramaOptions);
  } else if (svStatus == 'ZERO_RESULTS') {

     errormsg.innerHTML = "There are no nearby panoramas. Please enter higher radius.";
  } else {
     errormsg.innerHTML = "The request could not be successfully processed, yet the exact reason for failure is unknown.";
  }
}

google.maps.event.addDomListener(window, 'load', initialize);