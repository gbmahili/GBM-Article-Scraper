// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../../models/AdventistNews.model");
const SavedNews = require("./../../models/SavedNews.model");
module.exports = app => {
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
}