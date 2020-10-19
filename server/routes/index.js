const express = require('express')
const router = express.Router()
const reqiureLogin = require('../middleware/requireLogin')
// var pool = require('../database')
// const { getAllPosts,getOnePost, createPost, updatePost, deletePostComment, deletePost, 
//   updateLikes, postComment, updateComment, deleteComment, getAllPostComments, registerUser, 
//   loginUser,  getUserPosts, getOtherUserPosts, getOtherUserProfile} = require('../controllers')

const {registerUser, loginUser, getUserPosts, getOtherUserPosts, getOtherUserProfile} = require('../controllers/users')
const {getAllPosts,getOnePost, createPost, updatePost, deletePostComment, deletePost,updateLikes} = require('../controllers/posts')
const {postComment, updateComment, deleteComment, getAllPostComments} = require('../controllers/comments')
/*
    POSTS ROUTES SECTION
*/

router.get('/api/get/allposts', getAllPosts)
router.get('/api/get/post', getOnePost)
router.post('/api/post/posttodb', createPost)
router.put('/api/put/post', updatePost)
router.delete('/api/delete/postcomments', deletePostComment)
router.delete('/api/delete/post', deletePost)
router.put('/api/put/likes', updateLikes);

/*
    COMMENTS ROUTES SECTION
*/

router.post('/api/post/commenttodb', postComment)
router.put('/api/put/commenttodb', updateComment)
router.delete('/api/delete/comment', deleteComment)
router.get('/api/get/allpostcomments', getAllPostComments)

/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', registerUser)
router.get('/api/get/userprofilefromdb', loginUser )
router.get('/api/get/userposts', getUserPosts)
// Retrieve another users profile from db based on username 
router.get('/api/get/otheruserprofilefromdb', getOtherUserProfile);
//Get another user's posts based on username
router.get('/api/get/otheruserposts', getOtherUserPosts);

module.exports = router
