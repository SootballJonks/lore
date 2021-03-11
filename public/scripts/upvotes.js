const renderUpvotes = () => {
  $.ajax("/api/upvotes", { method: "GET" }).then((res) => {
    res.forEach((upvotesCounts) => {
      // console.log(`.upvotes-counts-${upvotesCounts.piece_id}`);
      $(`.upvotes-counts-${upvotesCounts.piece_id}`).append(
        `${upvotesCounts.count}`
      );
    });
  });
};
$(document).ready(() => {});
