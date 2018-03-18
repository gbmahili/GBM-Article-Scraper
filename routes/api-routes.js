// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../models/AdventistNews.model");
const SavedNews = require("./../models/SavedNews.model");
module.exports = function(app){
    // Home - Route to the home page
    app.get("/", (req, res) => {
        res.json({ Message: "News app started at...", Port: PORT });
    });
    
    // Save Article Route:
    app.post("/save_article", function (req, res) {
        // Get the ID of the article to save from the client
        var article_id = req.body.article_id;
        // Save it to the new schema for saved articles
        console.log(article_id);
        AdventistNews.findOne({ "_id": article_id })
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
                    SavedNews.create(articleToSave, (err, favoriteArticles) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(favoriteArticles);
                        }
                    });
                };
            });
    });

    // Get all the articles saved
    app.get("/getSavedArticles", function (req, res) {
        // Retrieve all articles from SavedNews
        SavedNews.find({}, (err, savedArticles) => {
            if (err) {
                res.send(err.message);
            } else {
                res.json(savedArticles);
            }
        })
    });

    // Delete Article
    app.delete("/deleteSavedArticle/:id", function (req, res) {
        // Retrieve all articles from SavedNews
        var article_id = req.params.id;
        SavedNews.remove({ _id: article_id }, (err, deletedArticle) => {
            if (err) {
                res.send(err.message);
            } else {
                res.json(deletedArticle);
            }
        })
    });

    // Update notes:
    app.post("/updateNewsNotes", function (req, res) {
        console.log(req.body);
        SavedNews.update({ _id: req.body.notesArticleId }, { NewsNotes: req.body.noteToBePosted }, function (err, updatedArticle) {
            if (err) {
                res.send(err.message);
            } else {
                res.json(updatedArticle);
            }
        })
    });
};