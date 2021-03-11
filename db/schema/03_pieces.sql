DROP TABLE IF EXISTS pieces CASCADE;

CREATE TABLE pieces (
    id          SERIAL PRIMARY KEY NOT NULL,
    user_id     INTEGER REFERENCES users(id) NOT NULL,
    story_id    INTEGER REFERENCES stories(id) NOT NULL,
    text        TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
