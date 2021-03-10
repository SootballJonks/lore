const userStoriesOnly = () => {
  return $.ajax({
    method: "GET",
    url: "/users/:userNAME",
  });
};

$(document).ready(() => {
  $("#user-stories").on("click", (event) => {
    event.preventDefault();

    userStoriesOnly().then((stories) => {
      renderStories(stories);
    });
  });
});
