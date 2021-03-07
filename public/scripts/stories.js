const renderStories = (stories) => {
  $(".all-stories").empty();

  $(".all-stories").append(createStories(stories));
};

const loadStories = (action) => {
  $.ajax("api/stories", { method: "get" })
    .then((res) => action(res))
    .catch((err) => console.log(err));
};

const createStories = (stories) => {
  let $story = $(`<article class="tweet-feed">
  <header>
    <div class="user-profile-name">
      <span class="username">${stories.stories.user_id}</span>
    </div>
    <a class="user-ID">${stories.stories.user_id}</a>
  </header>
  <p>${stories.stories.title}</p>
  <footer>
    ${stories.stories.tags}
    </div>
  </footer>
  </article>"`);

  return $story;
};

$(document).ready(loadStories(renderStories));
