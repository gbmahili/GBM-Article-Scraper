// require express
const express = require("express");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
// Require our News model
const AdventistNews = require("./../../models/AdventistNews.model");
const SavedNews = require("./../../models/SavedNews.model");

module.exports = app => {
    // Get All Articles
    app.get("/articles", function (req, res) {
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
            AdventistNews.create(results, (err, newsArticle) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(newsArticle);
                };
            });
        });
    });
}