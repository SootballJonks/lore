const $errorNoContent = $(`<h2 id="warning-too-long">
<i class="fas fa-exclamation-triangle fa-xs"></i>
Got nothing to say?<i class="fas fa-exclamation-triangle fa-xs"></i>
</h2>`);

const getTextLength = () => {
  const textLength = $("textarea").val();
  return textLength;
};
const textValidation = (str) => {
  if (str.length === 0) {
    return false;
  }
};

const storyIDSlicer = (storyIDAttr) => {
  let storyID = "";
  for (let i = 0; i < storyIDAttr.length; i++) {
    if (storyIDAttr.charCodeAt(i) > 47 && storyIDAttr.charCodeAt(i) < 58) {
      storyID += storyIDAttr[i];
    }
  }
  return storyID;
};

$(document).ready(() => {
  if (!textValidation(getTextLength)) {
    console.log("Enter somthing");
  }
});