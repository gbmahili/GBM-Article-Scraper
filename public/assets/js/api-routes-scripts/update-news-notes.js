$(document).ready(function(){
        // Add Notes Route.....................................
    var notesArticleId;
    $(document).on("click", ".viewAddNotes", function (e) {
        // Get the article id
        notesArticleId = $(this).attr("article_id");
    });
    // Send Notes to server..............
    $(".postNotesBtn").click(function (e) {
        e.preventDefault();
        // TODO:
        // Get Note to post
 
        noteToBePosted = $("#articleNotes").val();
        var articleInfo = {
            notesArticleId: notesArticleId,
            noteToBePosted: noteToBePosted
        };
        // Check if notes to be posted is not empty
        if (noteToBePosted) {
            // Send to server
            $.ajax({
                url: "/updateNewsNotes",
                method: "POST",
                data: articleInfo,
                success: function (updatedArticle) {
                    if (updatedArticle.ok) {
                        // Update UI with the new notes
                        $("#currentNotes").text(noteToBePosted);
                        $(".active").click();
                        Materialize.toast('Notes saved! Click on "Current Notes" to view the updated notes!', 5000);
                        $(".get-saved-aricles").click();
                    }

                }
            });
            // Clear the input field
            $("#articleNotes").val("");
        } else {
            Materialize.toast('Please enter article notes!', 5000);
            return;
        }
    });
});