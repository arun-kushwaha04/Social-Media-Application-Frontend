# Dubify  : Time to be social, go social

## Introduction

Time to get social. Isn’t it ? Then why wait. Get Started now. Finally, Dubify is here to help you get connected with the world providing an easy to use environment with an amazing interface, meeting all your needs like posts creating, sharing, comments, likes, adding and viewing stories, managing personal information and  much more waiting to be discovered. Bored with the regular theme ? Don’t Worry. Dark Mode is ready for you.

<img src="https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/unknown.png?alt=media&token=80f896ad-4835-4e0c-8474-9e04495e38ab" align="center">

<a href="https://webkirti-social-media-website.netlify.app/" target="_blank"> <h2> Live Webiste </h2> </a>


## Features Implemented

### Frontend
1. Login-SingUp pages:
    - Registeration of new users.
    - Login A register user.
    - Send Password reset email using SMTP service. 
    - Verification of user's email using SMTP service.

2. Posts - features:
    - Adding, Deleting and Editing.
    - Can contain text and image both.
    - Likes and Comments.
    - Resharing the posts.
    - Follow/Unfollow a user.

2. Personalised Dashboard for :
    - Viewing Posts and related Activities.
    - Search people registered on Dubify.
    - Viewing upcoming events.
    - My-Contact list.
    - Connection suggestions.
    - Follow/Unfollow a user.
    - See Trending Info and play games 

3. Stories Page :
    - Add your story
    - See like and view count on ohter's story.
    - View Others stories and like them

4. Profile Page:
    - View and Edit personal info and profile pic.
    - See Users Stats like followers, following, Total Posts and likes count.
    - All the users posts are shown which can be edited and deleted by user.

5. Dark/Light Theme.

6. Hamburger Icon (for mobile and tablets).
<br>

### Backend

1. Auth Route(auth/)
    - signUp -> Registeration of user.
    - login -> Authentication of user.
    - forgotPassword -> Send a JWT Token valid for 10 minutes on user's registered email.
    - verifyEmail -> Recevies a JWT token and if token is valid sets user verification status to true in database.
    - resendVerificationLink -> Mainly used to JWT Token when the earlier JWT Token expired.
    - logout -> Set logged in status to false in database.

2. Profile Route(user/)
    - getUserinfo -> Fetch user information from database using user's id as key.
    - updateName -> Make a PUT request at database to update user's name.
    - updatePassword -> Make a PUT request at database to update user's password.
    - updateProfilePhoto -> Make a PUT request at database to update user's Profile Picture.

3. Feed Route(feed/)
    - addPost -> Make a query at database to add a post.
    - getUserPost -> Query to fetch all post made by a particular user.
    - editUserPost -> Make a PUT request at database to update already existing post.
    - deleteUserPost -> Deletes a user's post.
    - getFollowingPosts -> Fetch post all the people the user is following.
    - updateLike -> Update Like Count on a post.
    - sharePost -> Query to share a post by other users.
    - commentPost -> Adds comments on a post.
    - getAllPostComment -> Fetch all comments on a post.
    - isLiked -> Check if a post is liked by particular user.
    - getPostById  -> Fetch a post using post id.

4. Follower Route(friend/)
    - getFollowing -> Fetch the list of following users.
    - getUserList -> Get List of all registered users.
    - getSuggestionList -> Get suggestions list for each users.
    - addFollowing -> Allow a user to follow other users.
    - removeFollowing -> Allow user to unfollow other users.

5.  Story Route(story/)
    - getStoryList -> Fetch the stories that are currently active.
    - addStory -> Add user's story to database.
    - getUserStory -> Fetch the user's story if uploaded.
    - updateLikeStory -> Update like on a story image.
    - updateViewStory -> Increase view on user's story.
 <br>
 
 <h2 align="center">Technologies Used</h2>
 <p align="center"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> 
    <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> 
    <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/css3.png"/> </a> 
    <a style="padding-right:8px;" href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a>
  <a style="padding-right:8px;" href="https://www.postgresql.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" width="40" height="40"/> </a>
    <a href="https://firebase.google.com/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/firebase.png"/> </a> 
    <a href="https://git-scm.com/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/git.png"/> </a> 
</p>
<br>

## Packages Used

    - Node Js
    - Express
    - JWT 
    - Bcrypt Js
    - Dotnev
    - Firebase SDK

<br>

## Local Setup

Clone the frontend and backend repositories, cd into them individually, and then follow the below mentioned steps for setting up backend and frontend separately.

Frontend:

    - Fork the repository.
    - Clone the repository (git clone https://github.com/arun-kushwaha04/Social-Media-Application-Frontend.git).
    - Open the folder in which you cloned the repository.
    - Setup your backend using the below mentioned steps. Now you can either deploy your backend separately and use the hosted link or run locally and use that respective link.

Backend:

    - Fork the repository.
    - Clone the repository (git clone https://github.com/arun-kushwaha04/Social-Media-Application-Backend.git).
    - Open the folder in which you cloned the repository.
    - Run *npm install*.
    - Create a .env file.
    - Now you can run 'npm run dev' and start working locally.

Database:

   Check <a href = "https://github.com/arun-kushwaha04/Social-Media-Application-Frontend/blob/main/query.md" target="_blank"> Database Queries </a> for all table queries.

Create .env file (keys):

    - SALT_ROUND
    - SECRET_KEY
    - DATABASE_URL
    - DOMAIN //used for SMTP Service
    - KEY //used for SMTP Service
    //Firebase project details 
    - API_KEY
    - AUTH_DOMAIN
    - PROJECT_ID
    - STORAGE_BUCKET
    - MESSAGING_SENDER_ID
    - APP_ID 
    - MESUREMENT_ID
    
<br>

## Team Members
- <a href='https://github.com/arun-kushwaha04'>Arun Singh Kushwaha</a> 2020IMT016
- <a href='https://github.com/harshgupta1249'>Harsh Gupta</a> 2020IMT035
- <a href='https://github.com/vishwas031'>Vishwas Singh</a> 2020BCS074

## Screenshots

<div>
<img src="https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/Screenshot%202021-07-09%20103557.png?alt=media&token=12083600-c64e-4bfc-888c-a32cf2915f41" height='355px' width='200px' align='left'> <img src="https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/Screenshot%202021-07-09%20103518.png?alt=media&token=0dba977d-ae01-47f4-a803-8539b89a67a7" height='355px' width='200px' align='left'> <img src="https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/Screenshot%202021-07-09%20103352.png?alt=media&token=a5c29fd7-5fcf-4e71-8af0-c2909699b7bd" height='355px' width='200px' align='left'> 
</div>

<br><br>

<img src="https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/Screenshot%202021-07-09%20103025.png?alt=media&token=458298c5-abea-4aa0-a4fc-08b95f1625e9" style="margin-top: 30px"  align='center'>





