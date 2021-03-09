const createNewStoryForm = () => {
  let $newStory = $(`
  <form id="submit-new-story" method="POST" action="/:userNAME">
  <wired-card elevation="5" id="new-story-form" class="new-story-form">
  <header>
    <label for="story-title-input"> Story Title</label><input type="title" name="title" id="story-title" class="story-title-input"></input>
  </header>
  <textarea type="text" name="text" placeholder="Thy Tale" rows="6" class="wired-rendered piece-text-box"></textarea>
  <footer class="story-tags-input">
  <label for="story-tags-input"> Tags</label><input type="tags" name="tags" id="story-tags" class="story-tags-input"></input>
  </footer>

  <button type="submit">submit</button>
  </wired-card>
  </form>`);

  return $newStory;
};
