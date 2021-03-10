//LOAD CONTRIBUTIONS FROM DATABASE (3-step process)
const createExistingPieces = (pieces) => {
  $pieces = $(
    `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
    <div class=piece-content>${pieces.text}</div>
    <footer>
    <wired-icon-button class="red wired-rendered">
    <i class="fas fa-heart"></i>
    </wired-icon-button>
    </footer>
    </wired-card>`
  );

  return $pieces;
};

const renderPieces = () => {
  $("main").on("click", (event) => {
    let storyIDAttr = $(event.target).parent()[0].id;
    let storyID = storyIDSlicer(storyIDAttr);

    if (storyID) {
      $(".all-stories").empty();
      $.ajax(`api/pieces/${storyID}`, { method: "get" })
        .then((res) => {
          return res.forEach((piece) => {
            RenderPieces(piece);
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

const RenderPieces = (pieces) => {
  $(".pieces-spot").append(createExistingPieces(pieces).hide().fadeIn(400));
};

//-------------

//SUBMIT PIECES TO THE STORY AS PENDING
const submitPiece = () => {
  $(document).on("click", "#submit-piece-btn", (event) => {
    event.preventDefault();
    let storyID = $($story).find(".storyID").attr("name");
    let text = $($story).find("wired-textarea").val();
    $.ajax({
      method: "post",
      url: "/api/pieces",
      data: { storyID: storyID, text: text },
    }).then((res) => {
      RenderPieces(res);
    });
  });
};

$(document).ready(() => {
  submitPiece();
  renderPieces();
});
