//generate the navigator
const headerGenerator = () => {
  $header = $(`
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">LORE</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <form method="GET" action="/:userNAME" class="nav-stories">
          <a class="nav-link" id="user-stories" href="#"
            >My Stories <span class="sr-only">(current)</span></a
          >
          <a class="nav-link" id="all-user-stories" href="#"
            >All Stories <span class="sr-only">(current)</span></a
          >
        </form>
      </li>
    </ul>

    <button
      id="newStory-button"
      class="btn btn-outline-success my-2 my-sm-0 btn-outline-dark"
      type="submit"
    >
      New Story
    </button>
  </div>
  </nav>
  `);

  $("body").prepend($header);
};

$(document).ready(() => {
  headerGenerator();
});