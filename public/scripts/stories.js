//Load all the stories from
const loadStories = (action) => {
  $.ajax("api/stories", { method: "get" })
    .then((res) => action(res))
    .catch((err) => console.log(err));
};
//render all the stories in the all-stories class in stories.ejs
const renderStories = (stories) => {
  $(".all-stories").empty();

  for (story of stories) {
    $(".all-stories").append(createStories(story)); //append all the stories
  }
};
//create the story elements to append in the stories.ejs
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
