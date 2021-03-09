const createNewStoryForm = () => {
  let $newStory = $(`
  <form id="submit-new-story" class="sumbit-new-story method="POST" >
  <wired-card elevation="5" id="new-story-form" class="new-story-form">
  <header>
    <label for="story-title-input"> Story Title</label><input type="title" name="title" id="story-title" class="story-title-input"></input>
  </header>
  <textarea type="text" name="text" placeholder="Thy Tale" rows="6" class="wired-rendered piece-text-box"></textarea>
  <footer class="story-tags-input">
  <label for="story-tags-input"> Tags</label><input type="tags" name="tags" id="story-tags" class="story-tags-input"></input>
  </footer>
  <div class=new-story-submit-button>
  <button type="submit">submit</button>
  </div>
  </wired-card>
  </form>`);

  return $newStory;
};

const renderNewStoryForm = () => {
  $(".new-story").empty();
  $(".new-story").append(createNewStoryForm);
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
    const data = $("#submit-new-story").serialize();
    createNewStory(data)
      .then((response) => console.log(response.body))
      .catch((err) => {
        console.log(err);
      });
  });
};

$(document).ready(() => {
  newStoryButton();
  submitNewStory();
});
