const renderUpvotes = () => {
  $.ajax("/api/upvotes", { method: "GET" }).then((res) => {
    res.forEach((upvotesCounts) => {
      $(`.upvotes-counts-${upvotesCounts.piece_id}`).append(
        `${upvotesCounts.count}`
      );
    });
  });
};

const renderAddedUpvotes = (pieceID) => {
  $.ajax("/api/upvotes", { method: "GET" }).then((res) => {
    res.forEach((upvotesCounts) => {
      if (upvotesCounts.piece_id === Number(pieceID)) {
        console.log(upvotesCounts.piece_id === pieceID);
        $(`.upvotes-counts-${upvotesCounts.piece_id}`).empty();
        $(`.upvotes-counts-${upvotesCounts.piece_id}`).append(
          `${upvotesCounts.count}`
        );
      }
    });
  });
};
