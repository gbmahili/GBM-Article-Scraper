// require express
const express = require("express");
// Require our News model
const AdventistNews = require("./../../models/AdventistNews.model");
const SavedNews = require("./../../models/SavedNews.model");
module.exports = app => {
    // Save Article Route:
  app.post("/save_article", function (req, res) {
      // Get the ID of the article to save from the client
      var article_id = req.body.article_id;
      // Save it to the new schema for saved articles
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
}