//Load all the stories from

const loadStories = (action) => {
  $.ajax("api/stories", { method: "GET" })
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
      $.ajax("api/stories", { method: "GET" })
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
        <footer class="story-tags">
        ${story.tags}
        </div>
      </footer>
        <p class="story-text">${story.text}</p>
        <div class="pieces-spot">
        </div>
        <form id="submit-piece" method="POST" action="/api/pieces">
          <div class="contribution">
          <wired-textarea placeholder="Are you there Ashen One?" rows="6" class="wired-rendered piece-text-box"></wired-textarea>
          <button id="submit-piece-btn" type="submit">submit</button>
          <wired-button id="btn2" class="back-button">Back</wired-button>
          </div>
        </form>
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

//SUBMIT PIECE TO STORY
const submitPiece = () => {
  $("#submit-piece-btn").on("click", (event) => {
    event.preventDefault();
    console.log("Submitting piece to story...");
    $.ajax("/api/pieces", {
      method: "post",
      data,
    }).then((res) => {
      console.log(res);
    });
  });
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
    $(".new-story").empty();
  });
};
const allStoriesButton = () => {
  $(document).on("click", "#all-user-stories", function () {
    $(".single-story").empty();
    $(".new-story").empty();
    loadStories(renderStories);
  });
};

$(document).ready(() => {
  renderSingleStory();
  loadStories(renderStories);
  backButton();
  mystoryButton();
  newStoryButton();
  submitNewStory();
  allStoriesButton();
});
