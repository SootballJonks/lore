-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS upvotes CASCADE;

CREATE TABLE upvotes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pieces_id INTEGER REFERENCES pieces(id) ON DELETE CASCADE,
  approve boolean NOT NULL DEFAULT TRUE
);
