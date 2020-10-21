const express = require('express')
const router = express.Router()

const { DATABASE_URL} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  
const {verifyToken} = require('../middleware/verifyToken')


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

//Search Posts
router.get('/api/get/searchpost', (req, res, next) => {
  search_query = String(req.query.search_query)
  pool.query(`SELECT * FROM posts
              WHERE search_vector @@ to_tsquery($1)`,
    [ search_query ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

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

router.post('/api/posts/userprofiletodb',registerUser)  
router.post('/api/get/userprofilefromdb', loginUser )
router.get('/api/get/userposts', getUserPosts)
// Retrieve another users profile from db based on username 
router.get('/api/get/otheruserprofilefromdb', getOtherUserProfile);
//Get another user's posts based on username
router.get('/api/get/otheruserposts', getOtherUserPosts);

/*
  MESSAGE SECTION
*/

//Delete a message with the message id
router.delete('/api/delete/usermessage', (req, res, next) => {
  const mid = req.body.mid
  pool.query(`DELETE FROM messages
              WHERE mid = $1`,
    [ mid ], (q_err, q_res) => {
    if (q_err) return next(q_err);    
    res.json(q_res.rows);
  });
});

//Send Message to db
router.post('/api/post/messagetodb', (req, res, next) => {
  const from_username = String(req.body.message_sender)
  const to_username = String(req.body.message_to)
  const title = String(req.body.title)
  const body = String(req.body.body)

  const values = [from_username, to_username, title, body]
  pool.query(`INSERT INTO messages(message_sender, message_to, message_title, message_body, date_created) VALUES($1, $2, $3, $4, NOW())`,
    values, (q_err, q_res) => {
    if (q_err) return next(q_err);    
    res.json(q_res.rows);
  });
});

//Get another user's posts based on username
router.get('/api/get/usermessages', (req, res, next) => {
  const username = String(req.query.username)  
  pool.query(`SELECT * FROM messages WHERE message_to = $1`,
    [ username ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});


module.exports = router
