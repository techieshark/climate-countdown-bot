require('dotenv').load();

var TwitterBot = require("node-twitterbot").TwitterBot;
var countdown = require("./countdown.js");


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

// Calculate time left
var paris = new Date("30 Nov 2015 09:00:00 +0100");
countdown.setEventDate(paris);
var remaining = countdown.getRemaining();
var timeLeft = remaining.months + " months, " +
                remaining.days + " days, " +
                remaining.hours + "h " +
                remaining.minutes + "m " +
                remaining.seconds + "s";

// Compose tweet
var url = "http://grist.org"; // climate-countdown.com
var hashtags = "#climatecountdown"; // cntdwn2paris
// var timeLeft = getTwitterClockText();
var text = 'Only ' + timeLeft + ' until the Paris Climate talks.';
// var text = 'Only ' + timeLeft + ' until the #COP21 Paris #climate talks. The time for action: NOW.';



// Tweet
// tweet(text, 'http://climate-countdown.com', 'COP21,cntdwn2paris,');
tweet(text, url, hashtags);
