//LOAD CONTRIBUTIONS FROM DATABASE (3-step process)
const createExistingPieces = (pieces) => {
  $pieces = $(
    `<wired-card elevation="2" id="piece-${pieces.id}" class="piece">
    <div class=piece-content>${pieces.text}</div>
    <footer>
      <wired-icon-button id="upvote-btn">
        <i class="fas fa-heart"></i>
      </wired-icon-button>
      <wired-icon-button id="approve-btn" data-pieces-id="${pieces.id}">
        <i class="fas fa-check"></i>
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
            addPieces(piece);
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

const addPieces = (pieces) => {
  $(".pieces-spot").append(createExistingPieces(pieces).hide().fadeIn(400));
};


//SUBMIT PIECES TO THE STORY AS PENDING
const submitPiece = () => {
  $(document).on("click", "#submit-piece-btn", (event) => {
    event.preventDefault();

    let storyID = $($story).find(".storyID").attr('name');
    let text = $($story).find("wired-textarea").val();

    $.ajax({
      method: "post",
      url: "/api/pieces",
      data: { storyID: storyID, text: text },
    }).then((res) => {
      addPieces(res);
    });
  });
};


//APPROVE PIECE AND ADD TO BOTTOM OF STORY
const approvePiece = () => {
  $(document).on("click", "#approve-btn", function (event) {
    event.preventDefault();

    let storyID = $($story).find(".storyID").attr('name');
    let pieceID = $(this).attr("data-pieces-id");

    $.ajax({
      method: "post",
      url: "/api/pieces/:storyID",
      data: { storyID: storyID, pieceID: pieceID }
    })
  })

}



$(document).ready(() => {
  submitPiece();
  renderPieces();
  approvePiece();
});
