require('dotenv').load();

var TwitterBot = require("node-twitterbot").TwitterBot;
var countdown = require("./countdown.js");
var intervalID;

// Include your access information below
var Bot = new TwitterBot({
  "consumer_secret": process.env.CONSUMER_SECRET,
  "consumer_key": process.env.CONSUMER_KEY,
  "access_token": process.env.ACCESS_TOKEN,
  "access_token_secret": process.env.ACCESS_TOKEN_SECRET
});

var tweet = function (phrase, url, hashtags) {
  Bot.tweet(phrase + " " + url + " " + hashtags);
  process.stdout.write(phrase + " " + url + " " + hashtags + "\n");
};

var run = function () {
  if (intervalID) {
    clearInterval(intervalID);
  }

  // sleep for an hour +/- some random time (variety is the spice of life!)

  var seconds = Math.floor(Math.random() * 60);
  var minutes = Math.floor(Math.random() * 60);
  var hours = 3; // never tweet more than once an hour
  // process.stdout.write("time until next run: " + hours + "h" + minutes + "m" + seconds + "s\n");

  intervalID = setInterval(function () {
    try {
      run();
    } catch (e) {
      console.log(e);
    }
  }, ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000);

  // Calculate time until Paris

  var paris = new Date("30 Nov 2015 09:00:00 +0100");
  countdown.setEventDate(paris);
  var remaining = countdown.getRemaining();
  var timeLeft = remaining.months + " months, " +
                  remaining.days + " days, " +
                  remaining.hours + "h " +
                  remaining.minutes + "m " +
                  remaining.seconds + "s";

  // Compose tweet

  var url = ""; // climate-countdown.com
  var hashtags = ""; // cntdwn2paris
  // var timeLeft = getTwitterClockText();
  var text = 'Only ' + timeLeft + ' until the Paris Climate talks.';
  // var text = 'Only ' + timeLeft + ' until the #COP21 Paris #climate talks. The time for action: NOW.';

  // Tweet
  // tweet(text, 'http://climate-countdown.com', 'COP21,cntdwn2paris,');

  tweet(text, url, hashtags);
};

run();
