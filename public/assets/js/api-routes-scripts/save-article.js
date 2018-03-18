$(document).ready(function(){
    // Save news Route.................................
    $(document).on("click", ".save-article-btn", function (e) {
        e.preventDefault();
        // Create an object that contains the ID of the article to save
        const post_id = {
            article_id: $(this).attr("article_id")
        };
        // Send the id of the article to save to the server
        $.post("/save_article", post_id, function (data) {
            $("#articleSavedModal").removeClass("red").addClass("cyan");
            $(".articleSavedModalMsg").text("Article Saved!");
            if (data.code == 11000) {
                $("#articleSavedModal").removeClass("cyan").addClass("red");
                $(".articleSavedModalMsg").text("You already saved that article!");
                console.log("You already saved that article");
            }
        });
    });
})