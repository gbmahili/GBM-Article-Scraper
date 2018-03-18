$(document).ready(function(){
    var savedArticles = {};
    // Get Saved Articles Route................................
    $(document).on("click", ".get-saved-aricles", function (e) {
        e.preventDefault();
        // Send the id of the article to save to the server
        $("#allTheNews").text("");
        $.get("/getSavedArticles", function (savedArticleData) {

            savedArticleData.forEach(element => {
                // Get saved article data
                savedArticles = savedArticleData;
                // Build a note
                var x = `
                                <div class="col s12 m6">
                                    <div class="card blue-grey darken-2">
                                        <div class="card-content white-text">
                                        <span class="card-title">${element.NewsTitle}</span>
                                        <p>${element.NewsArticleBlurb}</p>
                                        </div>
                                        <div class="card-action">
                                        <a class="btn" href="${element.NewsLink}" target="_blank">Read Article</a>
                                        <a class="btn-floating waves-effect waves-light modal-trigger cyan viewAddNotes" article_id="${element._id}" href="#modal"><i class="material-icons right">comment</i></a>
                                        <a class="btn-floating waves-effect waves-light red deleteSavedArticle" article_id="${element._id}"><i class="material-icons right">delete</i></a>

                                        </div>
                                    </div>
                                </div>
                        `;
                $("#allTheNews").append(x);
            });
            // Pass the savedArticles to the outside world
            if (savedArticles != "") {
                return savedArticles;
            } else {
                console.log("You don't have any articles saved at this time.")
            }

        });
    });

    // Add Notes Route.....................................
    var notesArticleId;
    $(document).on("click", ".viewAddNotes", function (e) {
        // Get the article id
        notesArticleId = $(this).attr("article_id");
        // Loop through all the saved articles
        savedArticles.forEach(element => {
            if (element._id == notesArticleId) {
                // Get the article title of the view notes clicked on
                $("#selectedArticle").text(element.NewsTitle);
                // Populate current notes of the article clicked on
                $("#currentNotes").text(element.NewsNotes);
            }
        });
    });
});