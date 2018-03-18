// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../../models/AdventistNews.model");
const SavedNews = require("./../../models/SavedNews.model");
module.exports = app => {
    // Update notes:
    app.post("/updateNewsNotes", function (req, res) {
        SavedNews.update({ _id: req.body.notesArticleId }, { NewsNotes: req.body.noteToBePosted }, function (err, updatedArticle) {
            if (err) {
                res.send(err.message);
            } else {
                res.json(updatedArticle);
            }
        })
    });
}