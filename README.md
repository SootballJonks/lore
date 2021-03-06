# User Stories

- User will be able to sign in so there will be a sign in route
- User will not be able to access the story edit if they are not log in, so user will see an error msg or the login component will appear
- Users can upvote a contribution to an existing (and active) story, so there will be a upvotes or downvote counts on every story
- Users cannot upvote/rate entire stories, only pending contributions, so user will not see edit, upvotes/downvotes option on the completed story
- Users can view all stories on the homepage, and the stories have a ‘in-progress’/completed status associated to them.
- Users who are story creators will have an option to complete their story, so there will be a complete button
- Users cannot contribute to stories that are marked ‘completed’.
- Users can specify tags for their own stories, so that they can be filtered & searched for easily
- Users will get a unique url that they are share with other people after creating a story

# ERD

```
users
---------------
id        | PK NOT NULL
email     | VARCHAR(255) NOT NULL
password  | VARCHAR(255) NOT NULL
---------------

stories
---------------
id        | PK NOT NULL
user_id   | FK REFERENCES users(id) NOT NULL
title     | VARCHAR(255) NOT NULL
text      | TEXT
tags      | TEXT [...]
---------------

pieces
---------------
id        | PK NOT NULL
story_id  | FK REFERENCES stories(id) NOT NULL
user_id   | FK REFERENCES users(id) NOT NULL
text      | TEXT
---------------

upvotes
---------------
id        | PK NOT NULL
user_id   | FK REFERENCES users(id) NOT NULL
piece_id  | FK REFERENCES pieces(id) NOT NULL
[????]    | BOOLEAN DEFAULT TRUE
---------------
```

# RESTful

Landing Page
READ GET /

User
BROWSE GET /:userID www.website.com/SootballJonks/12846198715
READ GET /:userID

STORY EDIT
READ GET /users/:storyID www.website.com/UserName/38423795817
EDIT POST /users/:storyID

PIECES
READ GET /users/story/piece:id
DELETE POST /users/story/piece:id
