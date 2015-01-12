/*
 * TODO
 * - would be cool if the popup had just the stats for the day (no notes)
 * - could even color code days based on failures
 * - auto gen the front matter quick stats
 */

$(document).ready(function() {
  if (!$('.training-calendar-data').html()) {
    return;
  }

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
      rawEventObjects = JSON.parse(rawData);
      eventObjects = _.map(rawEventObjects, function(e) {
        var d = moment(e.date),
            year = d.year(),
            month = padNumber(d.month() + 1, 2),
            date = padNumber(d.date() + 1, 2);

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
