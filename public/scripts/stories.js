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
    if (story.text[i]) {
      snippet += story.text[i];
    }
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
  $("main").on("click", (event) => {
    //get the attribute Story ID and select parent
    let storyIDAttr = $(event.target).parent()[0].id;
    let storyID = storyIDSlicer(storyIDAttr);
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
        <form id="submit-piece">
          <span class="storyID" name="${story.id}"></span>
          <div class="contribution">
          <wired-textarea placeholder="Are you there Ashen One?" rows="6" class="wired-rendered piece-text-box"></wired-textarea>
          <button id="submit-piece-btn" type="submit">submit</button>
        </form>

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

const storyIDSlicer = (storyIDAttr) => {
  let storyID = "";
  for (let i = 0; i < storyIDAttr.length; i++) {
    if (storyIDAttr.charCodeAt(i) > 47 && storyIDAttr.charCodeAt(i) < 58) {
      storyID += storyIDAttr[i];
    }
  }
  return storyID;
};

$(document).ready(() => {
  renderSingleStory();
  loadStories(renderStories);
  allStoriesButton();
});
