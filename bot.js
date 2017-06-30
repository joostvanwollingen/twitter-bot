var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var Bot = new TwitterBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

var feed = require("feed-read");

feed("http://dasholzfeller.blogspot.com/feeds/posts/default", function(err, articles) {
    if (err) throw err;
    // Each article has the following properties:
    //
    //   * "title"     - The article title (String).
    //   * "author"    - The author's name (String).
    //   * "link"      - The original article link (String).
    //   * "content"   - The HTML content of the article (String).
    //   * "published" - The date that the article was published (Date).
    //   * "feed"      - {name, source, link}
    //

    var phrase = chooseRandom(articles);
    // console.log(phrase + " (" + phrase.length + ")")
    // console.log(phrase.substring(0,139))
    Bot.tweet(phrase.substring(0,139));
});


function chooseRandom(myArray) {
    var index = Math.floor(Math.random() * myArray.length)
    // console.log("title: " +myArray[index].title)
    // console.log("content: " +myArray[index].content)
    return myArray[index].title + (myArray[index].content? ": " + myArray[index].content:"");
}


