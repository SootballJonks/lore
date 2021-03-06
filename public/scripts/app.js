$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).then((res) => {
    console.log(res);
    for (user of users) {
      console.log(user);
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});
