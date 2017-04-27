function myMap() {
    var map = new google.maps.Map(document.getElementById('googleMap'),{
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
        var pos = {
            lat: success.location.lat,
            lng: success.location.lng
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found');
    });
}
