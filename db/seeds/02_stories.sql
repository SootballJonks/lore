-- Widgets table seeds here (Example)
INSERT INTO
  stories (user_id, title, text, tags)
VALUES
  (
    1,
    'Testing Grounds',
    'This is a bunch of test words for a test story.',
    ARRAY ['test', 'story']
  );

INSERT INTO
  stories (user_id, title, text, tags)
VALUES
  (
    2,
    'Those With Purpose',
    'Will never hollow!',
    ARRAY ['hollow', 'darksouls']
  );
