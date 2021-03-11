const mystoryButton = () => {
  $(document).on("click", "#user-stories", function () {
    $(".single-story").empty();
    $(".new-story").empty();
  });
};
const allStoriesButton = () => {
  $(document).on("click", "#all-user-stories", function () {
    $(".single-story").empty();
    $(".new-story").empty();
    loadStories(renderStories);
  });
};

const backButton = () => {
  $(document).on("click", ".back-button", function () {
    $(".single-story").empty();
    loadStories(renderStories);
  });
};

const newStoryButton = () => {
  $(document).on("click", "#newStory-button", function () {
    $(".all-stories").empty();
    $(".single-story").empty();
    renderNewStoryForm();
  });
};

const completeButton = () => {
  $(document).on("click", "#complete-button", function (event) {
    let storyID = $($story).find(".storyID").attr("name");
    event.preventDefault();
    console.log(storyID);
    $.ajax({
      method: "post",
      url: "/users/complete",
      data: { storyID },
    }).then((res) => {
      $(".single-story").empty();
      appendSingleStory(res);
    });
  });
};

const upvoteButton = () => {
  $(document).on("click", "#upvote-btn", function (event) {
    event.preventDefault();

    let pieceID = $(this).attr("data-pieces-id");

    $.ajax({
      method: "post",
      url: "/api/upvotes",
      data: { pieceID: pieceID },
    }).then((res) => {
      console.log(res); //res will currently either be a number, or the string "already upvoted". Can remove this string by removing the .catch() in the router.
    });
  });
};

const deletePieceButton = () => {
  $(document).on("click", "#delete-btn", function (event) {
    event.preventDefault();
    let storyID = $($story).find(".storyID").attr("name");
    let pieceID = $(this).attr("data-pieces-id");
    console.log(storyID);
    $.ajax({
      method: "post",
      url: "/api/pieces/:storyID/delete",
      data: { pieceID: pieceID },
    }).then((res) => {
      confirmDelete($(`#piece-${pieceID}`));
    });
  });
};

const approvePieceButton = () => {
  $(document).on("click", "#approve-btn", function (event) {
    event.preventDefault();

    let storyID = $($story).find(".storyID").attr("name");
    let pieceID = $(this).attr("data-pieces-id");

    $.ajax({
      method: "post",
      url: "/api/pieces/:storyID",
      data: { storyID: storyID, pieceID: pieceID },
    }).then((res) => {
      let pieceText = $(`#piece-${pieceID}`).text(); //get the text content of the piece area
      $(`#piece-${pieceID}`).fadeOutAndRemove("fast"); //delete the piece with fadeoutandremove function
      $(`#story-${storyID} p`).append(`<br /><br />${pieceText}`); //append the text to the bottom of the story content
    });
  });
};
$(document).ready(() => {
  backButton();
  mystoryButton();
  newStoryButton();
  completeButton();
  upvoteButton();
  approvePieceButton();
  deletePieceButton();
  allStoriesButton();
});
