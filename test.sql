SELECT
  pieces.id AS piece_id
FROM
  (
    SELECT
      count(*) as total_upvotes,
      piece_id
    FROM
      upvotes
    GROUP BY
  ) as totals_table;
