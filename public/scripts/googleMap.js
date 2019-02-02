$(document).ready(function(){
    console.log("jQuery google map running");

    
    




      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.7749, lng: -122.4194},
          zoom: 14
        });
        infoWindow = new google.maps.InfoWindow;

        geocoder.geocode('29 champs elysée paris', function(err, res) {
            console.log(res);
          });

        function getUserCleaningEvents(){
            $.ajax({
                method: 'GET',
                url: getUserCleaningEventsUrl ,
                success: onSuccess,
                error: onError
            });
                function onError ( err ) {
                    console.log( err );
                    console.log("get error",err)
                }
                function onSuccess (cleaningEvents) {
                    console.log(`google map: cleaningEvent Arr:`, cleaningEvents)
                }
        }
    
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      initMap()
})