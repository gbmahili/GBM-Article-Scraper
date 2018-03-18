// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../../models/AdventistNews.model");
const SavedNews = require("./../../models/SavedNews.model");
module.exports = app => {
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
}