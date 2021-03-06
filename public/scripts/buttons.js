/*This file contains the jQuery functions for various buttons across the webapp.
 */
//click to see users' stories
const mystoryButton = () => {
  $(document).on("click", "#user-stories", function () {
    $(".single-story").empty();
    $(".new-story").empty();
    scrollUpAction();
  });
};
//click to see all the available stories
const allStoriesButton = () => {
  $(document).on("click", "#all-user-stories", function () {
    $(".single-story").empty();
    $(".new-story").empty();
    loadStories(renderStories);
    scrollUpAction();
  });
};
//go back to the all stories page
const backButton = () => {
  $(document).on("click", ".back-button", function () {
    $(".single-story").empty();
    loadStories(renderStories);
    scrollUpAction();
  });
};

const newStoryButton = () => {
  $(document).on("click", "#newStory-button", function () {
    $(".all-stories").empty();
    $(".single-story").empty();
    renderNewStoryForm();
    scrolltoNewStoryFormAction();
  });
};

const completeButton = () => {
  $(document).on("click", "#complete-button", function (event) {
    let storyID = $($story).find(".storyID").attr("name");
    event.preventDefault();
    $.ajax({
      method: "post",
      url: "/users/complete",
      data: { storyID },
    }).then((res) => {
      $(".single-story").empty();
      createSingleStory(res);
    });
  });
};

const upvoteButton = () => {
  $(document).on("click", "#upvote-btn", function (event) {
    event.preventDefault();
    let pieceID = $(this).attr("data-pieces-id");
    $.ajax({
      method: "POST",
      url: "/api/upvotes",
      data: { pieceID },
    }).then((res) => {
      renderAddedUpvotes(pieceID);
    });
  });
};

const deletePieceButton = () => {
  $(document).on("click", "#delete-btn", function (event) {
    event.preventDefault();
    let storyID = $($story).find(".storyID").attr("name");
    let pieceID = $(this).attr("data-pieces-id");
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
      //get the text content of the piece area. .html() preserves </br>
      let pieceText = $(`#piece-${pieceID}`).find(".piece-content").html();
      //delete the piece with fadeoutandremove function
      $(`#piece-${pieceID}`).fadeOutAndRemove("fast");
      //append the text to the bottom of the story content
      $(`#story-${storyID} p`).append(`<br /><br />${pieceText}`);
    });
  });
};

const logoutButton = () => {
  $(document).on("click", "#logout-button", function (event) {
    event.preventDefault();

    $.ajax({
      method: "post",
      url: "/login/logout",
      success: function (data) {
        console.log(data);
        window.location.reload();
      },
    });
  });
};

const submitPieceButton = () => {
  $(document).on("click", "#submit-piece-btn", (event) => {
    event.preventDefault();

    let storyID = $($story).find(".storyID").attr("name");
    let text = $($story).find("wired-textarea").val();

    if (!textValidation(text)) {
      warning();
      return;
    }
    $(".piece-text-box").val("");
    $.ajax({
      method: "post",
      url: "/api/pieces",
      data: { storyID: storyID, text: text },
    }).then((res) => {
      createExistingPieces(storyID, res);
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
  logoutButton();
  submitPieceButton();
});
