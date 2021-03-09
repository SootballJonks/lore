const db = require("../db/db.js");

/*  SEARCH FUNCTIONALITY IS A STRETCH.
    IT IS NOT A REQUIREMENT FOR THE MIDTERM PROJECT.
*/

//user stories for userpage
const getUserStories = (username) => {
  const queryString = `
    SELECT *
    FROM stories
    JOIN users ON users.id = user_id
    WHERE users.username = $1;
  `;
  const values = [username];

  return db
    .query(queryString, values)
    .then((data) => data.rows)
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//all stories for homepage
const getAllStories = () => {
  let queryString = `
    SELECT *
    FROM stories
  `;

  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//view if story is active
const storyActive = (req) => {

};

//Search for specific story (*stretch*)
const searchStories = (options) => {
  const queryParams = [];

  let queryString = `
    SELECT *
    FROM stories
    JOIN users ON users.id = user_id
    WHERE true
  `;

  //specific user
  if (options.username) {
    queryParams.push(`%${options.username}%`);
    queryString += `AND user_id LIKE $${queryParams.length} `;
  }
  //specific title
  if (options.title) {
    queryParams.push(`%${options.title}%`);
    queryString += `AND title LIKE $${queryParams.length} `;
  }
  //specific tags
  if (options.tags) {
    queryParams.push(`%${options.tags}%`);
    queryString += `AND tags ANY($${queryParams.length}) `;
  }
  //active status
  if (options.active) {
    queryParams.push(`%${options.active}%`);
    queryString += `AND active = $${queryParams.length} `;
  }

  queryString += `;`;

  return db
    .query(queryString, queryParams)
    .then((data) => data.rows)
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//get id from current user
const getID = (username) => {
  const queryString = `
  SELECT id
  FROM users
  WHERE username = $1
  `;
  const values = [username];

  return db
    .query(queryString, values)
    .then((data) => {data.rows[0]})
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//create a new story
const newStory = (user_id, entry) => {
  const queryString = `
    INSERT INTO stories
    (user_id, title, text, tags)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, entry.title, entry.text, entry.tags];

  return db
    .query(queryString, values)
    .then((data) => data.rows[0])
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//get piece for specific story
const getAllPieces = (storyID) => {
  const queryString = `
    SELECT *
    FROM pieces
    WHERE story_id = $1;
  `;
  const values = [storyID];

  return db
    .query(queryString, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//add a piece to an in-progress story as 'pending'
const addNewPiece = (entry) => {
  const queryString = `
    INSERT INTO pieces
    (user_id, story_id, text)
    VALUES
    ($1, $2, $3)
    RETURNING *;
  `;
  const values = [entry.user_id, entry.story_id, entry.text];

  return db
    .query(queryString, values)
    .then((data) => data.rows[0])
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//add a pending piece to the story
const addPieceToStory = (story_id, piece_id) => {
  const queryString1 = `
    SELECT pieces.text AS new_text, stories.text AS original_text
    FROM pieces
    JOIN stories ON stories.id = story_id
    WHERE story_id = $1;
  `;
  const queryString2 = `
    UPDATE stories
    SET text = $2
    WHERE id = $1
    RETURNING * ;
  `;

  let values = [story_id];

  return db
    .query(queryString1, values)
    .then((data) => {
      let results = data.rows[0];
      return results.original_text + results.new_text;
    })
    .then((text) => {
      console.log("text: ", text)
      values.push(text);
      db.query(queryString2, values);
    })
    .then((data) => {data})
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//add upvote to pending piece
const addUpvote = (entry) => {
  const queryString = `
    INSERT INTO upvotes
    (user_id, piece_id)
    VALUES
    ($1, $2)
    RETURNING * ;
  `;
  const values = [entry.user_id, entry.piece_id];

  return db
    .query(queryString, values)
    .then((data) => {
      const upvote = data.rows[0];
      res.json({ upvote });
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//get all upvotes for pending piece
const getAllUpvotes = (piece_id) => {
  const queryString = `
    SELECT count(*)
    FROM upvotes
    WHERE piece_id = $1;
  `;
  const values = [piece_id];

  return db
    .query(queryString, values)
    .then((data) => {
      const upvoteCount = data.rows;
      res.json({ upvoteCount });
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//Check if user exists in database(for logging in)
const checkEmail = (email) => {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;
  const values = [email];

  return db
    .query(queryString, values)
    .then((data) => {
      console.log('user:', data.rows[0]);
      return data.rows[0];
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

module.exports = {
  getUserStories,
  searchStories,
  getAllStories,
  newStory,
  getAllPieces,
  addNewPiece,
  addPieceToStory,
  addUpvote,
  getAllUpvotes,
  checkEmail,
  getID
};
