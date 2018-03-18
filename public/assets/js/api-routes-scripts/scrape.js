$(document).ready(function(){
    // Get all articles
    $(document).on("click", ".scrapData", function (e) {
        e.preventDefault();
        // First, let's empty the allTheNews div
        $("#allTheNews").text("");
        // Send request to the server
        $.get("/articles", function (data) {
            // Loop through all the news articles returned from the server
            data.forEach(element => {
                // Create a singleNewsArticle
                var singleNewsArticle = `
                                <div class="col s12 m6 articleCard">
                                    <div class="card blue-grey darken-1">
                                        <div class="card-content white-text">
                                        <span class="card-title">${element.NewsTitle}</span>
                                        <p>${element.NewsArticleBlurb}</p>
                                        </div>
                                        <div class="card-action">
                                        <a class="btn" href="${element.NewsLink}" target="_blank">Read Article</a>
                                        <a class="btn waves-effect waves-light save-article-btn blue modal-trigger" href="#articleSavedModal" article_id="${element._id}">Save Article</a>
                                        </div>
                                    </div>
                                </div>
                        `;
                // Append the singleNewsArticle to allTheNews
                $("#allTheNews").append(singleNewsArticle);
            });
        });
    });
});