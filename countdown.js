var extend = require("extend");

(function () {

  // var Countdown = function () {
  //   // this.time = new Date("30 Nov 2015 09:00:00 +0100");
  // };
  // var countdown = extend(true, Countdown, {

  var countdown = extend(true, {}, {

    time: new Date("30 Nov 2015 09:00:00 +0100"),

    /**
     * Gets number of months
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a floored integer
     */

    getMonths: function () {
      // var months = this.getTimeSeconds() / 60 / 60 / 24 / 30;

      // compare end month to current month
      var endTime = this.time;
      var endMonth = endTime.getFullYear() * 12 + endTime.getMonth();
      var endDate = endTime.getDate();
      var now = new Date();
      var thisMonth = now.getFullYear() * 12 + now.getMonth();
      var thisDate = now.getDate();

      var months = endMonth - thisMonth;

      if (endMonth > thisMonth && endDate < thisDate) {
        months--; // don't count partial months (less than one full month)
      }

      return Math.floor(months);
    },


    /**
     * Gets number of days
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a floored integer
     */

    getDays: function (mod) {

      // compare end month to current month
      var endTime = this.time;
      var endMonth = endTime.getFullYear() * 12 + endTime.getMonth();
      var endDate = endTime.getDate();
      var now = new Date();
      var thisMonth = now.getFullYear() * 12 + now.getMonth();
      var thisDate = now.getDate();
      if (endMonth > thisMonth && endDate >= thisDate) {
        // count partial months differently
        return endTime.getDate() - now.getDate();
      }

      var days = this.getTimeSeconds() / 60 / 60 / 24;

      if (mod) {
        days = days % 7;
      }

      return Math.floor(days);
    },

    /**
     * Gets number of hours
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a floored integer
     */

    getHours: function (mod) {
      var hours = this.getTimeSeconds() / 60 / 60;

      if (mod) {
        hours = hours % 24;
      }

      return Math.floor(hours);
    },


    /**
     * Gets number of minutes
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a floored integer
     */

    getMinutes: function (mod) {
      var minutes = this.getTimeSeconds() / 60;

      if (mod) {
        minutes = minutes % 60;
      }

      return Math.floor(minutes);
    },


    /**
     * Gets time count in seconds regardless of if targetting date or not.
     *
     * @return  int   Returns a floored integer
     */

    getTimeSeconds: function () {
      var date = new Date();
      if (this.time instanceof Date) {
        return Math.max(this.time.getTime() / 1000 - date.getTime() / 1000, 0);
      }
    },


    /**
     * Gets number of seconds
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a ceiled integer
     */

    getSeconds: function (mod) {
      var seconds = this.getTimeSeconds();

      if (mod) {
        if (seconds === 60) {
          seconds = 0;
        } else {
          seconds = seconds % 60;
        }
      }

      return Math.ceil(seconds);
    },

    /**
     * Gets number of weeks
     *
     * @param   bool  Should perform a modulus? If not sent, then no.
     * @return  int   Retuns a floored integer
     */

    getWeeks: function (mod) {
      var weeks = this.getTimeSeconds() / 60 / 60 / 24 / 7;

      if (mod) {
        weeks = weeks % 52;
      }

      return Math.floor(weeks);
    },
  });

  module.exports.setEventDate = function (date) {
    countdown.time = date;
  };

  module.exports.getCountdown = function () {
    return countdown;
  };

  module.exports.getRemaining = function () {
    return {
      months: countdown.getMonths(),
      days: countdown.getDays(),
      hours: countdown.getHours(true),
      minutes: countdown.getMinutes(true),
      seconds: countdown.getSeconds(true)
    };
  };

}());