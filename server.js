// Get all dependencies needed to run this application:
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Create the express instance
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Get api routes
require("./routes/api-routes")(app);
require("./routes/api/scrape")(app);
require("./routes/api/save-article")(app);
require("./routes/api/retrieve-saved-articles")(app);
require("./routes/api/delete-saved-article")(app);
require("./routes/api/update-news-notes")(app);
// use port 4000 or the environment's assigned port...such as Heroku's own port
var PORT = process.env.PORT || 4000;
// If deployed to heroku, use the deployed database (process.env.MONGODB_URI). Otherwise use the local adventist_news database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/adventist_news";
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// Start the server
app.listen(PORT, () => console.log(`App started at port ${PORT}!`));