$(document).ready(function(){
    // Delete Saved Article Route
    $(document).on("click", ".deleteSavedArticle", function (e) {
        e.preventDefault();
        // Create an variable that contains the ID of the article to DELETE
        var article_id = $(this).attr("article_id");

        $.ajax({
            url: `/deleteSavedArticle/${article_id}`,
            type: 'DELETE',
            success: function (responseIs) {
                // Check if the response is okay...means 1 was returned in the ok property of the object
                if (responseIs.ok == 1) {
                    // Refresh the saved article by clicking the Get Saved Articles Button
                    $(".get-saved-aricles").click();
                }
            }
        });
    });
});