//check if user has entered anything in the textarea
const textValidation = (str) => {
  if (str.length === 0) {
    return false;
  }
  return true;
};
//get the storyID of the current selected story
const storyIDSlicer = (storyIDAttr) => {
  let storyID = "";
  for (let i = 0; i < storyIDAttr.length; i++) {
    if (storyIDAttr.charCodeAt(i) > 47 && storyIDAttr.charCodeAt(i) < 58) {
      storyID += storyIDAttr[i];
    }
  }
  return storyID;
};
const pieceIDSlicer = (storyIDAttr) => {
  let storyID = "";
  for (let i = 0; i < storyIDAttr.length; i++) {
    if (storyIDAttr.charCodeAt(i) > 47 && storyIDAttr.charCodeAt(i) < 58) {
      storyID += storyIDAttr[i];
    }
  }
  return storyID;
};
//if there is no content when user click submit, show warning
const warning = () => {
  Swal.fire({
    title: "?",
    text: "Vows of Silence?",
    confirmButtonColor: "#343a40",
  });
};
//work in progress, check if user has entered email or password
const warningLogin = () => {
  Swal.fire({
    text: "Please Enter your email or password",
    confirmButtonColor: "#343a40",
  });
};
//custom jquery lib to add fadeout remove effect
jQuery.fn.fadeOutAndRemove = function (speed) {
  $(this).fadeOut(speed, function () {
    $(this).remove();
  });
};
//show warning if user is deleting the piece, confirm to delete and no to cancel
const confirmDelete = ($piece) => {
  Swal.fire({
    title: "Are you sure you want to delete?",
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
    confirmButtonColor: "#303030",
    denyButtonColor: "#303030",
  }).then((result) => {
    if (result.isConfirmed) {
      $piece.remove();
    } else if (result.isDenied) {
    }
  });
};

const upvotesAdder = (pieceID) => {
  let $currentCounts = $(`.upvotes-counts-${pieceID}`).text();
  let $newCounts = $currentCounts * 1 + 1;
  $(`.upvotes-counts-${pieceID}`).text($newCounts);
  return;
};

const disableButton = ($buttonID) => {
  $buttonID.attr("disabled", true);
};
const scrollUpAction = () => {
  $("html, body").animate({ scrollTop: 0 }, 300);
};
