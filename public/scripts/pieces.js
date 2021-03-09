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


//SUBMIT PIECES TO THE STORY AS PENDING
const submitPiece = () => {
  $(document).on("click", '#submit-piece-btn', (event) => {
    event.preventDefault();

    let username = sessionUsername();
    let  storyID = $($story).find(".storyID").attr('name');
    let  text = $($story).find("wired-textarea").val();
    console.log("username inside submitPiece: ", username);
    console.log("StoryID inside submitPiece: ", storyID);
    console.log("text inside submitPiece: ", text);

  //   $.ajax({
  //     method: 'post',
  //     url: '/api/pieces',
  //     data: { username: username, storyID: storyID, text: text }
  //   })
  //     .then((res) => {
  //       console.log(res)
  //     })
  })
};






$(document).ready(() => {
  submitPiece();
  renderPieces();
});
