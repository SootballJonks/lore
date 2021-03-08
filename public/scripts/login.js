const renderLogin = () => {
  $(".all-stories-container").empty();

  $(".all-stories-container").append(createlogin());
};

const createlogin = () => {
  let $login = $(`<wired-card elevation="5">
  <div class="email">
  <span>Email</span><wired-input placeholder="enter your email"></wired-input>
  </div>
  <div class="password">
  <span>Password</span><wired-input placeholder="enter your password"></wired-input>
  </div>

  <wired-button class="login-button" id="btn1">Login</wired-button>
  <wired-button class="cancel-button" id="btn1">Cancel</wired-button>

</wired-card>`);

  return $login;
};

$(document).ready(() => {
  $("#login-button").click(() => renderLogin());
});
