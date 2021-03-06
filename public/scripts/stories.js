const { load } = require("dotenv");

const renderStories = (stories) => {
  for (i in stories) {
    console.log(i);
  }
};

const loadStories = (action) => {
  console.log("it's here");
  $.ajax("api/stories", { method: "get" }).then((res) => action(res));
};

$(document).ready(loadStories(renderStories));
