const renderLogin = () => {
  $("#login").empty();

  $("#login").append(createlogin);
};

const createlogin = () => {
  let $story = $(`<wired-card elevation="5">
  <span>Name</span><wired-input>Enter Name</wired-input>
  <span>Password</span><wired-input>Password</wired-input>
</wired-card>`);

  return $story;
};

$(document).ready(renderLogin());
