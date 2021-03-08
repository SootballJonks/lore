const renderLogin = () => {
  $(".all-stories-container").empty();

  $(".all-stories-container").append(createlogin());
};

const createlogin = () => {
  let $loginForm = $(`<wired-card elevation="5">

    <div class="email">
      <span>Email</span><wired-input placeholder="enter your email"></wired-input>
    </div>
    <div class="password">
      <span>Password</span><wired-input placeholder="enter your password"></wired-input>
    </div>

    <wired-button type="submit" class="login-button" id="btn1">Login</wired-button>
    <wired-button class="cancel-button" id="btn1">Cancel</wired-button>

</wired-card>`);

  return $loginForm;
};

$(document).ready(() => {});
