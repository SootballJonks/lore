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
    // let storyID = $($story).find(".storyID").attr("name");
    event.preventDefault();
    let storyID = 2;
    $.ajax({
      method: "post",
      url: "/users/complete",
      data: { storyID: storyID },
    });
  });
};

$(document).ready(() => {
  backButton();
  mystoryButton();
  newStoryButton();
  completeButton();
  allStoriesButton();
});
