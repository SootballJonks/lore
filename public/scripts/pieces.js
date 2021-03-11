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
              <i class="fas fa-heart"></i>
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

const renderPieces = () => {
  $("main").on("click", (event) => {
    let storyIDAttr = $(event.target).parent()[0].id;
    let storyID = storyIDSlicer(storyIDAttr);

    if (storyID) {
      $(".all-stories").empty();
      $.ajax(`api/pieces/${storyID}`, {
        method: "get",
        success: function (res) {
          return res.forEach((piece) => {
            createExistingPieces(storyID, piece);
          });
        },
      });
    }
  });
};

// const RenderPieces = (storyID, piece) => {
//   $(".pieces-spot").append(createExistingPieces(storyID, piece).hide().fadeIn(400));
// };

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

    $.ajax({
      method: "post",
      url: "/api/pieces",
      data: { storyID: storyID, text: text },
    }).then((res) => {
      createExistingPieces(storyID, res);
    });
  });
};

//APPROVE PIECE AND ADD TO BOTTOM OF STORY

const updateNewPieceInStory = (storyID) => {
  $.ajax("api/stories", { method: "GET" }).then((response) => {
    $(".single-story").empty();
    appendSingleStory(response[storyID - 1]);
    $.ajax(`api/pieces/${storyID}`, {
      method: "get",
      success: function (finalresponse) {
        return finalresponse.forEach((piece) => {
          createExistingPieces(storyID, piece);
        });
      },
    });
  });
};

$(document).ready(() => {
  submitPiece();
  renderPieces();
});
