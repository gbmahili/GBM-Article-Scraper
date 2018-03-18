// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../models/AdventistNews.model");
const SavedNews = require("./../models/SavedNews.model");
// Export all the routes
module.exports = app => {
    require("./view/html-routes")(app);
    require("./api/scrape")(app);
    require("./api/save-article")(app);
    require("./api/retrieve-saved-articles")(app);
    require("./api/delete-saved-article")(app);
    require("./api/update-news-notes")(app);
};