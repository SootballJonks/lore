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

const completeStoryButton = () => {
  $(document).on("click", "#complete-button", function (event) {
    event.preventDefault();
    let storyID = $($story).find(".storyID").attr("name");
    console.log(storyID);
    $.ajax({
      method: "POST",
      url: "/users/complete",
      data: { storyID },
    });
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  });
};

$(document).ready(() => {
  backButton();
  mystoryButton();
  newStoryButton();
  completeStoryButton();
});
