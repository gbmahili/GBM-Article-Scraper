// Require mongoose
const mongoose = require("mongoose");
// Instanciate our schema
var Schema = mongoose.Schema;
// Create a new article from our schema
var NewsArticleSchema = new Schema({
    NewsTitle: {
        type : String,
        required : "Title is Required"
    },
    NewsArticleBlurb: {
        type: String,
        required: "Blurb is Required"
    },
    NewsLink: {
        type: String,
        required: "Link is Required"
    },
    NewsNotes: {
        type: String
    }
});

// Export our new Book schema to be used
module.exports = mongoose.model("AdventistNews", NewsArticleSchema);