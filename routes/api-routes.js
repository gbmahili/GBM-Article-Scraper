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

};