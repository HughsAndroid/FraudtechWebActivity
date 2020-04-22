// file: js/script_.js



/**
 * Updates the file input's label to reflect the name of the file
 * the user has selected to upload.
 */
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
