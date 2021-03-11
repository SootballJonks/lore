const renderUpvotes = () => {
  $.ajax("/api/upvotes", { method: "GET" }).then((res) => {
    res.forEach((upvotesCounts) => {
      $(`.upvotes-counts-${upvotesCounts.piece_id}`).append(
        `${upvotesCounts.count}`
      );
    });
  });
};
// const addUpvotes = () => {
//   $.ajax("/api/upvotes", { method: "GET" }).then((res) => {
//     res.forEach((upvotesCounts) => {
//       $(`.upvotes-counts-${upvotesCounts.piece_id}`).append(
//         `${upvotesCounts.count}`
//       );
//     });
//   });
// };
