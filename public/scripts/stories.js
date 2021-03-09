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

const createNewStoryForm = () => {
  let $newStory = $(`
  <form id="submit-new-story" method="POST" action="/:userNAME">
  <wired-card elevation="5" id="new-story-form" class="new-story-form">
  <header>
    <label for="story-title-input"> Story Title</label><input id="story-title" class="story-title-input"></input>
  </header>
  <textarea placeholder="Thy Tale" rows="6" class="wired-rendered piece-text-box"></textarea>
  <footer class="story-tags-input">
  <label for="story-tags-input"> Tags</label><input id="story-tags" class="story-tags-input"></input>
  </footer>

  <button type="submit">submit</button>
  </wired-card>
  </form>`);

  return $newStory;
};

const renderNewStoryForm = () => {
  $(".new-story").empty();
  $(".new-story").append(createNewStoryForm);
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

const newStoryButton = () => {
  $(document).on("click", "#newStory-button", function () {
    $(".all-stories").empty();
    $(".single-story").empty();
    renderNewStoryForm();
  });
};

const submitNewStory = () => {
  $(document).on("submit", "#submit-new-story", (event) => {
    event.preventDefault();
    $storyTitle = $("#submit-new-story #story-title").val();
    $storyContent = $("#submit-new-story textarea").val();
    $storyTag = $("#story-tags").val();

    let data = {
      title: $storyTitle,
      text: $storyContent,
      tags: $storyTag,
    };

    $.ajax({ url: "api/stories", method: "POST", data: data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

$(document).ready(() => {
  renderSingleStory();
  loadStories(renderStories);
  backButton();
  mystoryButton();
  newStoryButton();
  submitNewStory();
});
