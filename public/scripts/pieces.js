//LOAD CONTRIBUTIONS FROM DATABASE (3-step process)
const createExistingPieces = (storyID, pieces) => {
  //TRUE/FALSE if current user is the owner of story
  $.ajax({
    method: "POST",
    url: "/users",
    data: { storyID },
    success: function (res) {
      if (!res) {
        $pieces = $(
          `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
          <div class=piece-content>${pieces.text}</div>
          <footer>
            <wired-icon-button id="upvote-btn" data-pieces-id="${pieces.id}">
              <div class="upvotes-counts-${pieces.id}">
              <i class="fas fa-heart"></i>
              </div>
            </wired-icon-button>
          </footer>
          </wired-card>`
        );
        $(".pieces-spot").append($pieces).hide().fadeIn(400);
        return $pieces;
      }

      $pieces = $(
        `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
        <div class=piece-content>${pieces.text}</div>
        <footer>
          <wired-icon-button id="approve-btn" data-pieces-id="${pieces.id}">
            <i class="fas fa-check"></i>
          </wired-icon-button>
          <wired-icon-button id="delete-btn" data-pieces-id="${pieces.id}">
          <i class="fas fa-trash-alt"></i>
        </wired-icon-button>
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

//SUBMIT PIECES TO THE STORY AS PENDING
const submitPiece = () => {
  $(document).on("click", "#submit-piece-btn", (event) => {
    event.preventDefault();

    let storyID = $($story).find(".storyID").attr("name");
    let text = $($story).find("wired-textarea").val();

    if (!textValidation(text)) {
      warning();
      return;
    }
    $(".piece-text-box").val("");
    $.ajax({
      method: "post",
      url: "/api/pieces",
      data: { storyID: storyID, text: text },
    }).then((res) => {
      createExistingPieces(storyID, res);
    });
  });
};

$(document).ready(() => {
  submitPiece();
  renderPieces();
});
