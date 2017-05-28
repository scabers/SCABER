function getCurrentLocation(callback){
    // One time see location !
    if(navigator.geolocation){
        var startPos;
        var geoSuccess = function(position){
            startPos = position;
            // alert("You now in (" + startPos.coords.latitude + "," + startPos.coords.longitude + ")");
            var pos = {
                lat: startPos.coords.latitude,
                lng: startPos.coords.longitude
            }
            callback(0,pos);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }else {
        callback(1,"Current browser doesn't support navigator!");
    }
}
