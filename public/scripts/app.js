// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users",
//   }).then((res) => {
//     for (user of users) {
//       console.log(user);
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

let userStoriesOnly = () => {
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
