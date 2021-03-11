const db = require("../db/db.js");
const express = require("express");
/*  SEARCH FUNCTIONALITY IS A STRETCH.
    IT IS NOT A REQUIREMENT FOR THE MIDTERM PROJECT.
*/

//user stories for userpage
const getUserStories = (username) => {
  const queryString = `
    SELECT stories.id AS id, stories.user_id AS user_id, stories.title AS title, stories.text AS text, stories.tags AS tags, stories.active AS active
    FROM stories
    JOIN users ON user_id = users.id
    WHERE users.username = $1
    ORDER BY stories.id;
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
    ORDER BY id;
  `;

  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//Complete story (mark as active =false)
const storyComplete = (reqbody) => {
  const queryString = `
  SELECT active
  FROM stories
  WHERE id = $1;
  `;

  const values = [reqbody.storyID]

  return db
    .query(queryString, values)
    .then((data) => {
      console.log("Data from inside query: ", data.rows);
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
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
    .then((data) => {
      return data.rows[0].id;
    })
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
    ($1, $2, $3, regexp_split_to_array($4, E'\\s+'))
    RETURNING *;
  `;

  let str = entry.text;
  let strWithBreaks = str.replace(/\n/g, "</br>");

  const values = [user_id, entry.title, strWithBreaks, entry.tags];

  db.query(queryString, values)
    .then((data) => {
      return data.rows[0];
    })
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
const addNewPiece = (user_id, entry) => {
  const queryString = `
    INSERT INTO pieces
    (user_id, story_id, text)
    VALUES
    ($1, $2, $3)
    RETURNING *;
  `;
  let str = entry.text;
  let strWithBreaks = str.replace(/\n/g, "</br>");

  const values = [user_id, entry.storyID, strWithBreaks];

  return db
    .query(queryString, values)
    .then((data) => data.rows[0])
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//add a pending piece to the story
const addPieceToStory = (reqbody) => {
  let appendedText = "";

  const queryString1 = `
    SELECT pieces.text AS new_text, stories.text AS original_text
    FROM pieces
    JOIN stories ON stories.id = story_id
    WHERE story_id = $1 AND pieces.id = $2;
  `;
  const queryString2 = `
    UPDATE stories
    SET text = $2
    WHERE id = $1;
  `;

  const queryString3 = `
    DELETE FROM pieces
    WHERE id = $1;
  `;

  const queryString4 = `
    SELECT text
    FROM stories
    WHERE id = $1;
  `;

  let values1 = [reqbody.storyID, reqbody.pieceID];
  let values2 = [reqbody.storyID];
  let values3 = [reqbody.pieceID];

  return db
    .query(queryString1, values1)
    .then((data) => {
      let results = data.rows[0];
      appendedText += results.original_text;
      appendedText += "</br></br>";
      appendedText += results.new_text;
      return appendedText;
    })
    .then((text) => {
      values2.push(text);
      db.query(queryString2, values2);
    })
    .then(() => {
      db.query(queryString3, values3);
    })
    .then(() => {
      db.query(queryString4, values);
    })
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//add upvote to pending piece
const addUpvote = (userID, pieceID) => {
  const queryString1 = `
    SELECT count(*) AS count
    FROM upvotes
    WHERE piece_id = $2 AND user_id = $1
    GROUP BY upvotes.user_id;
  `;
  const queryString2 = `
    INSERT INTO upvotes
    (user_id, piece_id)
    VALUES
    ($1, $2);
  `;
  const values = [userID, pieceID];


  return db
    .query(queryString1, values)
    .then((data) => {
      console.log(data.rows);
      if (!data.rows.length) {
        db.query(queryString2, values)
      }
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//get all upvotes for pending piece
const getAllUpvotes = (piece_id) => {
  const queryString2 = `
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
      return data.rows[0];
    })
    .catch((err) => {
      console.error("query error:", err.stack);
    });
};

//Check if story owner (returns true/false)
const isUserTheOwner = (username, storyID) => {
  const queryString = `
  SELECT username
  FROM stories
  JOIN users ON users.id = user_id
  WHERE stories.id = $1;
  `;
  const values = [storyID.storyID];

  return db
    .query(queryString, values)
    .then((data) => {
      let result = data.rows[0];
      if (result.username !== username) {
        return false;
      }
        return true;
    })
}


module.exports = {
  getUserStories,
  searchStories,
  getAllStories,
  newStory,
  storyComplete,
  getAllPieces,
  addNewPiece,
  addPieceToStory,
  addUpvote,
  getAllUpvotes,
  checkEmail,
  getID,
  isUserTheOwner,
};
