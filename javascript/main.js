/*
 * TODO
 * - would be cool if the popup had just the stats for the day (no notes)
 * - could even color code days based on failures
 * - auto gen the front matter quick stats
 */


// MAP
function initialize() {
  var mapOptions = {
    center: { lat: 0, lng: 0 },
    mapTypeId: google.maps.MapTypeId.HYBRID,
    zoom: 1
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var travelData = $('.travel-data').html(),
      rawTravelData = JSON.parse(travelData);

  _.each(rawTravelData, function(trip, i) {
      if (i == 0 && trip.center) {
          map.setCenter(new google.maps.LatLng(trip.coords[0].lat, trip.coords[0].lng));
          map.setZoom(trip.zoom ? trip.zoom : 5);
      }

      _.each(trip.coords, function(coord) {
          new google.maps.Marker({
              position: new google.maps.LatLng(coord.lat, coord.lng),
              map: map,
              title: trip.title
          });
      });
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function() {
  if (!$('.training-calendar-data').html()) {
    return;
  }

  /**
   * Number to padded String
   */
  var padNumber = function(x, n) {
    x = x.toString();
    if (x.length < n) {
      for (var i = 0; i < (n - x.length); i++) {
        x = "0" + x;
      }
    }

    return x;
  }

  var rawData = $('.training-calendar-data').html(),
      rawEventObjects = JSON.parse(rawData),
      eventObjects = _.map(rawEventObjects, function(e) {
        var d = moment(e.date),
            year = d.year(),
            month = padNumber(d.month() + 1, 2),
            date = padNumber(d.date() + 1, 2);

        // Weird off by one error, also behavior different locally vs deployed
        var dateTest = moment(year + '-' + month + '-' + date);
        if (!dateTest.isValid()) {
            month = padNumber(d.month() + 2, 2);
            date = '01';
        }

        return {
          title: e.title,
          allDay: true,
          start: e.date,
          url: '/training/' + year + '/' + month + '/' + date + '/ss/',
        };
      });


  // Instantiate full calendar.
  $('.calendar').fullCalendar({
    header: {
      left: 'title',
      right: 'prev,next'
    },
    events: eventObjects
  });


});
