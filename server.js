// require express
const express = require("express");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
// Set up an instance of express
const app = express();
app.use(express.static('public'))
// Require body-parser to get data from the form
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Require mongoose
const mongoose = require("mongoose");
// Require our News model
const AdventistNews = require("./models/AdventistNews.model");
const SavedNews = require("./models/SavedNews.model");
// use port 4000 or the environment's assigned port...such as Heroku's own port
var PORT = process.env.PORT || 4000;

// Here, we are creating our database location
// If deployed, use the deployed database. Otherwise use the local adventist_news database
const GBMLocalDB = "mongodb://localhost/adventist_news";
var MONGODB_URI = process.env.MONGODB_URI || GBMLocalDB;

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
// Let's connect to our database
mongoose.connect(MONGODB_URI);

// Home - Route to the home page
app.get("/", (req, res) => {
    res.json({ Message: "News app started at...", Port: PORT});
});

// Route article from the website scraped
app.get("/articles", function(req, res) {

    // Use the request package to get the website data
    request("https://news.adventist.org/en/all-news/", function (error, response, html) {
        var $ = cheerio.load(html);
        // An empty array to save the data that we'll scrape
        var results = [];

        $("div.media-block__content").each(function (i, element) {
            var newsTitle = $(element).children("h3").text();
            var newsLink = `https://news.adventist.org/${$(element).children("h3").children("a").attr("href")}`;
            var newsArticleBlurb = $(element).children("div").children("div").children("p").children("span").text();
            newsArticleBlurb = newsArticleBlurb.substring(1).slice(0, -1);
            
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                NewsTitle: newsTitle, 
                NewsArticleBlurb: newsArticleBlurb,
                NewsLink: newsLink,
                NewsNotes: "You currently don't have note. Add notes below..."
            });
        });
        // Push the new data to the database
        AdventistNews.create( results, (err, newsArticle) => {
            if(err){
                console.log(err);
            }else{
                res.json(newsArticle);
            };
        });
    });
});

// Save Article Route:
app.post("/save_article", function(req, res){
    // Get the ID of the article to save from the client
    var article_id = req.body.article_id;
    // Save it to the new schema for saved articles
    console.log(article_id);
    AdventistNews.findOne({ "_id": article_id})
    .exec(function (err, savedArticles) {
        if (err) {
            res.send(err);
        } else {
            // Get article to save using the data retrieved from the dabase through the id cliced
            var articleToSave = {
                NewsTitle: savedArticles.NewsTitle,
                NewsArticleBlurb: savedArticles.NewsArticleBlurb,
                NewsLink: savedArticles.NewsLink,
                NewsNotes: "You currently don't have note. Add notes below..."
            };
            // Save that article to the SavedNews Collection
            SavedNews.create(articleToSave, (err, favoriteArticles) =>{
                if(err) {
                    res.send(err.message);
                }else{
                    res.json(favoriteArticles);
                }
            });
        };
    });
});

// Get all the articles saved
app.get("/getSavedArticles", function(req, res) {
    // Retrieve all articles from SavedNews
    SavedNews.find({}, (err, savedArticles) =>{
        if(err){
            res.send(err.message);
        }else{
            res.json(savedArticles);
        }
    })
});

// Delete Article
app.delete("/deleteSavedArticle/:id", function (req, res) {
    // Retrieve all articles from SavedNews
    var article_id = req.params.id;
    SavedNews.remove({ _id: article_id}, (err, deletedArticle) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json(deletedArticle);
        }
    })
});

// Update notes:
app.post("/updateNewsNotes", function(req, res){
    console.log(req.body);
    SavedNews.update({_id: req.body.notesArticleId}, {NewsNotes: req.body.noteToBePosted}, function(err, updatedArticle){
        if (err) {
            res.send(err.message);
        } else {
            res.json(updatedArticle);
        }
    })
})

// Start the server
app.listen(PORT, () => console.log(`App started at port ${PORT}!`));