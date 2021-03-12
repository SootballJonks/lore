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
  let $story = "";
  let snippet = "";
  for (let i = 0; i < 120; i++) {
    if (story.text[i]) {
      snippet += story.text[i];
    } else {
      snippet += " ";
    }
  }
  if (story.active) {
    $story = $(`<wired-card elevation="6" id="story-${story.id}" class="story">
  <header>
    <span class="story-title">${story.title}</span>
  </header>
  <span class="stamp is-approved story-pending">pending</span>
  <p class="story-text">${snippet}...</p>
  <a href="#" class="story-read-more">Read More</a>
  <footer class="story-tags">
    ${story.tags}
    </div>
  </footer>
  </wired-card>`);
  } else {
    $story = $(`<wired-card elevation="6" id="story-${story.id}" class="story">
    <header>
      <span class="story-title">${story.title}</span>
    </header>
    <span class="stamp is-approved">completed</span>
    <p class="story-text">${snippet}...</p>
    <a href="#" class="story-read-more">Read More</a>
    <footer class="story-tags">
      ${story.tags}
      </div>
    </footer>
    </wired-card>`);
  }

  return $story;
};
//Render the story that user has clicked
const renderSingleStory = () => {
  $("main").on("click", (event) => {
    //get the attribute Story ID and select parent
    let storyIDAttr = $(event.target).parent()[0].id;
    let storyID = storyIDSlicer(storyIDAttr);

    if (storyID) {
      $(".all-stories").empty();
      $(".single-story").empty();
      $.ajax("api/stories", {
        method: "GET",
        success: function (res) {
          createSingleStory(res[storyID - 1]);
        },
      });
    }
  });
};
//appen story to the single story div
// const appendSingleStory = (story) => {
//   $(".single-story").append(createSingleStory(story));
// };
//create the story element
const createSingleStory = (story) => {
  //get TRUE/FALSE if current user is the owner of story
  $.ajax({
    method: "POST",
    url: "/users",
    data: { storyID: story.id },
    success: function (res) {
      if (story.active) {
        //if the story is active use this template
        if (!res) {
          //if signed-in user is NOT the owner, render this one...

          $story = $(
            `<wired-card elevation="5" id="story-${story.id}" class="story">
              <header>
                <span class="story-title">${story.title}</span>
              </header>
              <footer class="story-tags">
              ${story.tags}
              </>
              </footer>
              <p class="story-text">${story.text}</p>
              <div class="pieces-spot">
              </div>
              <form id="submit-piece">
                <span class="storyID" name="${story.id}"></span>
                <div class="contribution">
                <wired-textarea placeholder="Speak thine heart's desire..." rows="6" class="wired-rendered piece-text-box"></wired-textarea>
                <wired-button id="submit-piece-btn" type="submit">submit</wired-button>
              </form>

                <wired-button id="btn2" class="back-button">Back</wired-button>
              </div>
            </wired-card>`
          );
          $(".single-story").append($story);
          return $story;
        }
        $story = $(
          `<wired-card elevation="5" id="story-${story.id}" class="story">
            <header>
              <span class="story-title">${story.title}</span>
            </header>
            <div class="complete-button-container">
            <form id="complete-story">
            <wired-button type=submit id=complete-button>Complete Story</wired-button>
            </form>
            </div>
            <footer class="story-tags">
            ${story.tags}
            </>
          </footer>
            <p class="story-text">${story.text}</p>
            <div class="pieces-spot">
            </div>
            <form id="submit-piece">
              <span class="storyID" name="${story.id}"></span>
              <div class="contribution">
              <wired-textarea placeholder="Speak thine heart's desire..." rows="6" class="wired-rendered piece-text-box"></wired-textarea>
              <wired-button id="submit-piece-btn" type="submit">submit</wired-button>
            </form>

              <wired-button id="btn2" class="back-button">Back</wired-button>
            </div>
          </wired-card>`
        );
        $(".single-story").append($story);
      } else {
        $story = $(
          //if the story is not active use this template
          `<wired-card elevation="5" id="story-${story.id}" class="story">
            <header>
              <span class="story-title">${story.title}</span>
            </header>
            <div class="complete-story-status">
            <span class="stamp is-approved">Completed</span>
            </div>
            <p class="story-text">${story.text}</p>

            <footer class="story-tags">
              ${story.tags}
              </div>
            </footer>
          </wired-card>`
        );
        $(".single-story").append($story);
        return $story;
      }
    },
  });
};

$(document).ready(() => {
  renderSingleStory();
  loadStories(renderStories);
});
