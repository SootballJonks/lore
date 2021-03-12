//LOAD CONTRIBUTIONS FROM DATABASE (3-step process)
const createExistingPieces = (storyID, pieces) => {
  //TRUE/FALSE if current user is the owner of story
  $.ajax({
    method: "POST",
    url: "/users",
    data: { storyID },
    success: function (res) {
      if (!res) {
        //If the user is NOT the owner of the story render this one...
        $pieces = $(
          `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
          <div class=piece-content>${pieces.text}</div>
          <footer>
            <button id="upvote-btn" data-pieces-id="${pieces.id}">
              <div class="upvotes">
              <div class="upvotes-icon">
              <i class="fas fa-heart"></i>
              </div>
              </button>
              <div class="upvotes-counts-${pieces.id} upvotes-counts-container">
              </div>
              </div>

          </footer>
          </wired-card>`
        );
        $(".pieces-spot").append($pieces).hide().fadeIn(400);
        return $pieces;
      }
      //If the user IS the owner of the story, render this one...
      $pieces = $(
        `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
        <div class=piece-content>${pieces.text}</div>
        <footer>
        <button id="upvote-btn" data-pieces-id="${pieces.id}">
              <div class="upvotes">
              <div class="upvotes-icon">
              <i class="fas fa-heart"></i>
              </div>
              </button>
              <div class="upvotes-counts-${pieces.id} upvotes-counts-container">
              </div>
              </div>
          <button id="approve-btn" data-pieces-id="${pieces.id}">
            <i class="fas fa-check"></i>
          </button>
          <button id="delete-btn" data-pieces-id="${pieces.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
        </footer>
        </wired-card>`
      );
      $(".pieces-spot").append($pieces).hide().fadeIn(400);
      return $pieces;
    },
  });
};

//RENDER ALL THE PIECES TO A STORY WHEN USER CLICK THE STORY CARD
const renderPieces = () => {
  $("main").on("click", (event) => {
    let storyIDAttr = $(event.target).parent()[0].id;
    let storyID = storyIDSlicer(storyIDAttr);

    if (storyID) {
      $(".all-stories").empty();
      $.ajax(`api/pieces/${storyID}`, {
        method: "get",
        success: function (res) {
          renderUpvotes();
          return res.forEach((piece) => {
            createExistingPieces(storyID, piece);
          });
        },
      });
    }
  });
};

$(document).ready(() => {
  renderPieces();
});
