//Load all the stories from
const loadStories = (action) => {
  $.ajax("api/stories", { method: "get" })
    .then((res) => action(res))
    .catch((err) => console.log(err));
};

const renderStories = (stories) => {
  $(".all-stories").empty();

  for (story of stories) {
    $(".all-stories").append(createStories(story));
  }
};

const createStories = (story) => {
  let $story = $(`<wired-card elevation="4" class="story">
  <header>

    <span class="story-title">${story.title}</span>
  </header>
  <p class="story-text">${story.text}</p>
  <footer>
    ${story.tags}
    </div>
  </footer>
  </wired-card>"`);

  return $story;
};

$(document).ready(loadStories(renderStories));
