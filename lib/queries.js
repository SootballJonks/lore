const db = require('./db/db.js');

//user stories for userpage
const getUserStories = (user_id) => {
  const queryString = `
    SELECT *
    FROM stories
    WHERE user_id = $1;
  `;
  const values = [user_id];

  return db.query(queryString, values)
    .then(data => {
      const userStories = data.rows;
      res.json({ userStories });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
};


//all stories for homepage
const getAllStories = (options) => {
  const queryParams = [];

  let queryString = `
    SELECT *
    FROM stories
    WHERE true
  `;

  //specific user
  if(options.user_id) {
    queryParams.push(`%${options.user_id}%`);
    queryString += `AND user_id LIKE $${queryParams.length} `;
  }
  //specific title
  if(options.title) {
    queryParams.push(`%${options.title}%`);
    queryString += `AND title LIKE $${queryParams.length} `;
  }
  //specific tags
  if(options.tags) {
    queryParams.push(`%${options.tags}%`);
    queryString += `AND tags ANY($${queryParams.length}) `;
  }
  //active status
  if(options.active) {
    queryParams.push(`%${options.active}%`);
    queryString += `AND active = $${queryParams.length} `;
  }

  queryString += `;`;

  return db.query(queryString, queryParams)
    .then(data => {
      const allStories = data.rows;
      res.json({ allStories });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
};


//create a new story
const newStory = (entry) => {
  const queryString = `
    INSERT INTO stories
    (user_id, title, text, tags)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    entry.user_id,
    entry.title,
    entry.text,
    entry.tags
  ];

  return db.query(queryString, values)
    .then(data => {
      const newStory = data.rows[0];
      res.json({ newStory });
    })
    .catch(err => {
      console.error('query error:', err.stack)
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
  const values = [
    entry.user_id,
    entry.story_id,
    entry.text
  ];

  return db.query(queryString, values)
    .then(data => {
      const newPiece = data.rows[0];
      res.json({ newPiece });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
};

//add a pending piece to the story
const addPieceToStory = (piece) => {
  let appendedText = [];
  const queryString1 = `
    SELECT pieces.text AS new_text, stories.text AS original_text
    FROM pieces
    JOIN stories ON stories.id = story_id
    WHERE story_id = $1;
  `;
  const queryString2 = `
    UPDATE stories
    SET text = $2
    WHERE story_id = $1
    RETURNING * ;
  `;

  let values = [piece.story_id]

  return db.query(queryString1, values[0])
    .then(data => {
      let results = data.rows[0];
      appendedText.push(results.original_text);
      appendedText.push(results.new_text);
      appendedText.join('\n')
    })
    .then(data => {
      values.push(data);
      db.query(queryString2, values)
    })
    .then(data => {
      const appendedStory = data.rows[0];
      res.json({ appendedStory });
    })
    .catch(err => {
      console.error('query error:', err.stack)
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
  const values = [
    entry.user_id,
    entry.piece_id
  ]

  return db.query(queryString, values)
    .then(data => {
      const upvote = data.rows[0]
      res.json({ upvote });
    })
    .catch(err => {
      console.error('query error:', err.stack)
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

  return db.query(queryString, values)
    .then(data => {
      const upvoteCount = data.rows;
      res.json({ upvoteCount });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
};

module.exports = {
  getUserStories,
  getAllStories,
  newStory,
  addNewPiece,
  addPieceToStory,
  addUpvote,
  getAllUpvotes
};
