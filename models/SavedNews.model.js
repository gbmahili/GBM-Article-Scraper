// Require mongoose
const mongoose = require("mongoose");
// Instanciate our schema
var Schema = mongoose.Schema;
// Create a new article from our schema
var SavedNewsSchema = new Schema({
    NewsTitle: {
        type: String,
        required: "Title is Required",
        unique: true
    },
    NewsArticleBlurb: {
        type: String,
        required: "Blurb is Required",
        unique: true
    },
    NewsLink: {
        type: String,
        required: "Link is Required",
        unique: true
    },
    NewsNotes: {
        type: String
    }
});

// Export our new Book schema to be used
module.exports = mongoose.model("SavedNews", SavedNewsSchema);