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

    let pieceID = $(this).attr("data-pieces-id");

    $.ajax({
      method: "post",
      url: "/api/pieces/:storyID/delete",
      data: { pieceID: pieceID },
    }).then((res) => {
      console.log(res);
    });
  });
};
const loginWarning = () => {
  $(document).on("click", "#login-button", function (event) {
    // event.preventDefault();
    $.ajax("/login", { method: "GET" }).then((res) => {
      console.log(res);
    });
  });
};
$(document).ready(() => {
  backButton();
  mystoryButton();
  newStoryButton();
  completeButton();
  upvoteButton();
  deletePieceButton();
  allStoriesButton();
  loginWarning();
});
