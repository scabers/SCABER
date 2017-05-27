function getCurrentLocation(callback){
    // One time see location !
    var startPos;
    var geoSuccess = function(position){
        startPos = position;
        // alert("You now in (" + startPos.coords.latitude + "," + startPos.coords.longitude + ")");
        var pos = {
            lat: startPos.coords.latitude,
            lng: startPos.coords.longitude
        }
        callback(pos);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
}
