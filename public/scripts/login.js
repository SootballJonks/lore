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

//login function
const logIn = (data) => {
  console.log(data);
  return $.ajax({
    method: "POST",
    url: "/api/login",
    data
  });
}

$(document).ready(
  $("#login-button").click(() => renderLogin()),
  $("#cancel-button").click(() => renderLogin()),

  $('#btn1').on('submit', (event) => {
    event.preventDefault();

    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        console.log(json);
      })
  })
);
