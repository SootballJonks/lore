const db = require('./db/db.js');

const piece = {
  id: '3',
  user_id: '1',
  story_id: '1',
  text: 'This is test text from a piece!!'
};



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
    .then(res => {
      let results = res.rows[0];
      appendedText.push(results.original_text);
      appendedText.push(results.new_text);
      appendedText.join('\n')
    })
    .then(res => {
      values.push(res);
      db.query(queryString2, values)
    })
    .then(res => {
      res.rows[0];
    })
}

addPieceToStory(piece);
