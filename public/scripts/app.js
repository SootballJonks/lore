$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).then((res) => {
    for (user of users) {
      console.log(user);
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});
