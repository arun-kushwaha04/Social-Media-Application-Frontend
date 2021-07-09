## Query to create users table:

  > *CREATE TABLE users (id serial PRIMARY KEY, username text not null, email text not null, name text not null, isverified int not null, isloggedin int not null, password text not null, profilephoto text not null, likes int not null, comments int not null, share int not null, followercount int not null, postmade int not null, followingcount int not null,	about text not null, originalusername text not null);*

## Query to create posts table:

  > *CREATE TABLE posts 
  ( postId serial primary key not null, originalpostid int, userId int not null,
  constraint userId foreign key (userId) REFERENCES users (id) ,
  originalUserId int not null, 
  constraint originalUserId foreign key (originalUserId) REFERENCES users (id),
  description text not null, images text[] not null, postlikes int not null, postcomments int not null, 
  postshare int not null, datetime text not null);*

## Query to create comment table:

  > *CREATE table comment 
  (commentId serial primary key, postId int not null, originalpostid int not null, userId int not null,
  comment text not null, datetime text not null);*

## Query to create like table:

  > *CREATE TABLE likes (postid int not null, userid int not null);*

## Query to create shareposts table:

  > *CREATE TABLE shareposts (postid int not null, userid int not null);*

## Query to create follower table:

  > *CREATE TABLE follower (follower int not null, following int not null);*

## A function to automatically add date to story:

  > *CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON story
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();*

## Query to create story table:

  > *CREATE TABLE story (
    storyid SERIAL NOT NULL PRIMARY KEY,
    userid int not null,
       constraint userid
       foreign key (userid) 
       REFERENCES users (id),
    images text[] not null,
    likes int not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );*

## Binding the function with story table:

  > *CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;*

## Query to create likeonstory table:

  > *CRAETE TABLE likeonstory ( image text not null,  userid int not null);*

## Query to create viewonstory table:

  > *CREATE TABLE viewonstory (storyid int not null, userid int not null);*
