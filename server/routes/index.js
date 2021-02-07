const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { DATABASE_URL, JWT_SECRET} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  
const verifyToken = require('../middleware/verifyToken')


// const {registerUser, loginUser, getUser,getUserPosts, getOtherUserPosts, getOtherUserProfile} = require('../controllers/users')
const {trending, one_post, all_posts, recent} = require('../controllers/posts')
// const {postComment, updateComment, deleteComment, getAllPostComments} = require('../controllers/comments')

/*
    POSTS ROUTES SECTION
*/

router.get('/api/v1/trending',trending)
router.get('/api/v1/post/:id', one_post)
router.get('/api/v1/posts', all_posts)
router.get('/api/v1/recent', verifyToken, recent)


module.exports = router

