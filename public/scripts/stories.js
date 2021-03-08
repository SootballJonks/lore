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
    $(".all-stories").append(createStories(story));
  } //append all the stories
};

//create the story elements to append in the stories.ejs
const createStories = (story) => {
  let snippet = "";
  for (let i = 0; i < 120; i++) {
    snippet += story.text[i];
  }
  let $story = $(`<wired-card elevation="4" id="story-${story.id}" class="story">
  <header>
    <span class="story-title">${story.title}</span>
  </header>
  <p class="story-text">${snippet}...</p>
  <span class="story-read-more">Read More</span>
  <footer class="story-tags">
    ${story.tags}
    </div>
  </footer>
  </wired-card>`);

  return $story;
};

const renderSingleStory = () => {
  $("main").on("click", () => {
    let storyID = $(event.target).parent()[0].id.slice(-1);

    if (storyID) {
      $(".all-stories").empty();

      $.ajax("api/stories", { method: "get" })
        .then((res) => RenderSingleStory(res[storyID - 1]))
        .catch((err) => console.log(err));
    }
  });
};

const RenderSingleStory = (story) => {
  $(".single-story").append(createSingleStory(story));
};

const createSingleStory = (story) => {
  if (story.active) {
    $story = $(
      `<wired-card elevation="4" id="story-${story.id}" class="story">
        <header>
          <span class="story-title">${story.title}</span>
        </header>
        <p class="story-text">${story.text}</p>
        <footer class="story-tags">
          ${story.tags}
          </div>
        </footer>
        <wired-card elevation="2" id="piece" class="piece"><div class=piece-content>This is one of the piece</div><wired-icon-button class="red wired-rendered">
          <i class="fas fa-heart"></i>
        </wired-icon-button></wired-card>
        <div class="contribution">
        <wired-textarea placeholder="Are you there Ashen One?" rows="6" class="wired-rendered piece-text-box"></wired-textarea>
        <wired-button id="btn2" class="back-button">Back</wired-button>
        </div>
      </wired-card>`
    );
  } else {
    $story = $(
      `<wired-card elevation="4" id="story-${story.id}" class="story">
        <header>
          <span class="story-title">${story.title}</span>
        </header>
        <p class="story-text">${story.text}</p>

        <footer class="story-tags">
          ${story.tags}
          </div>
        </footer>
      </wired-card>`
    );
  }

  return $story;
};

const backButton = () => {
  $(document).on("click", ".back-button", function () {
    $(".single-story").empty();
    loadStories(renderStories);
  });
};

const mystoryButton = () => {
  $(document).on("click", "#user-stories", function () {
    $(".single-story").empty();
  });
};

$(document).ready(() => {
  renderSingleStory();
  loadStories(renderStories);
  backButton();
  mystoryButton();
});
