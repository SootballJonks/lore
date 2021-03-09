const createExistingPieces = (pieces) => {
  $pieces = $(
    `<wired-card elevation="2" id="piece-${pieces.id}" class="piece"><div class=piece-content>${pieces.text}</div><wired-icon-button class="red wired-rendered">
    <i class="fas fa-heart"></i>
  </wired-icon-button></wired-card>`
  );

  return $pieces;
};

const renderPieces = () => {
  $("main").on("click", () => {
    let storyID = $(event.target).parent()[0].id.slice(-1);

    if (storyID) {
      $(".all-stories").empty();

      $.ajax(`api/pieces/${storyID}`, { method: "get" })
        .then((res) => {
          console.log(res);
          return res.forEach((piece) => {
            RenderPieces(piece);
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

const RenderPieces = (pieces) => {
  $(".pieces-spot").append(createExistingPieces(pieces));
};

$(document).ready(() => {
  submitPiece();
  renderPieces();
});
