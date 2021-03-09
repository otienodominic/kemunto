CREATE TABLE blog_post_likes (
  post_id INT NOT NULL,
  author_id INT NOT NULL
);

CREATE TABLE blog_post_categories (
  post_id INT NOT NULL,
  category_id INT NOT NULL
);

CREATE TABLE blog_post_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  author_id INT NOT NULL,
  comment VARCHAR(250) NOT NULL
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  text TEXT NOT NULL,
  keyword1 VARCHAR(50) NOT NULL,
  keyword2 VARCHAR(50) NOT NULL,
  image VARCHAR(400) NOT NULL,
  bg_src VARCHAR(400) NOT NULL,
  bg_type VARCHAR(10) NOT NULL,
  active SMALLINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP  NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  created_at TIMESTAMP  NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  label TEXT [] NOT NULL,
  description VARCHAR(300) NOT NULL
);

CREATE TABLE roles_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY NOT NULL,
  action VARCHAR(20) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  role_id INT NOT NULL,
  email VARCHAR(30) NOT NULL,
  image VARCHAR(200),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  password VARCHAR(30),
  date_created DATE,
  last_login DATE
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(20) NOT NULL
);

ALTER TABLE blog_post_likes ADD FOREIGN KEY (post_id) REFERENCES blog_posts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_post_likes ADD FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_post_categories ADD FOREIGN KEY (post_id) REFERENCES blog_posts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_post_categories ADD FOREIGN KEY (category_id) REFERENCES blog_categories (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_post_comments ADD FOREIGN KEY (post_id) REFERENCES blog_posts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_post_comments ADD FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE blog_posts ADD FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE roles_permissions ADD FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE roles_permissions ADD FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE UNIQUE INDEX ON blog_post_likes (post_id, author_id);

CREATE UNIQUE INDEX ON blog_post_categories (post_id, category_id);

CREATE INDEX bpcauthor_ind ON blog_post_comments (author_id);

CREATE INDEX bpcpost_ind ON blog_post_comments (post_id);

CREATE INDEX bpauthor_ind ON blog_posts (author_id);

CREATE UNIQUE INDEX ON roles_permissions (role_id, permission_id);

CREATE INDEX uemail ON users (email);





-- TABLE OF PREVIOUS DAY

-- CREATE TABLE users (
--   uid SERIAL PRIMARY KEY,
--   username VARCHAR(255) UNIQUE,
--   email VARCHAR(255),
--   email_verified BOOLEAN,
--   password VARCHAR,
--   date_created DATE,
--   last_login DATE
-- );

-- CREATE TABLE posts (
--   pid SERIAL PRIMARY KEY,
--   title VARCHAR(255),
--   body VARCHAR,
--   search_vector TSVECTOR,
--   user_id INT REFERENCES users(uid),
--   author VARCHAR REFERENCES users(username),
--   date_created TIMESTAMP,
--   like_user_id INT[] DEFAULT ARRAY[]::INT[],
--   likes INT DEFAULT 0
-- );


-- CREATE TABLE comments (
--   cid SERIAL PRIMARY KEY,
--   comment VARCHAR(255),
--   author VARCHAR REFERENCES users(username),
--   user_id INT REFERENCES users(uid),
--   post_id INT REFERENCES posts(pid),
--   date_created TIMESTAMP
-- );


-- CREATE TABLE messages (
--   mid SERIAL PRIMARY KEY,
--   message_sender VARCHAR(255) REFERENCES users(username),
--   message_to VARCHAR(255) REFERENCES users(username),
--   message_title VARCHAR(255),
--   message_body VARCHAR,
--   date_created TIMESTAMP
-- );

