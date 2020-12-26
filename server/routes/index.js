const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { DATABASE_URL, JWT_SECRET} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  
const verifyToken = require('../middleware/verifyToken')


const {registerUser, loginUser, getUser,getUserPosts, getOtherUserPosts, getOtherUserProfile} = require('../controllers/users')
const {getAllPosts,getOnePost, createPost, updatePost, deletePostComment, deletePost,updateLikes, getMyPosts} = require('../controllers/posts')
const {postComment, updateComment, deleteComment, getAllPostComments} = require('../controllers/comments')
/*
    POSTS ROUTES SECTION
*/

router.get('/api/get/allposts', verifyToken,(req, res, next ) => {
  pool.query("SELECT * FROM posts ORDER BY date_created DESC", (q_err, q_res) => {
      res.json(q_res.rows)
  })
})

router.get('/api/get/post', verifyToken,(req, res, next) => {
  const post_id = req.query.post_id

  pool.query(`SELECT * FROM posts
              WHERE pid=$1`, [ post_id ],
              (q_err, q_res) => {
                res.json(q_res.rows)
      })
} )

router.put('/api/post/posttodb/:pid', verifyToken, updatePost)

router.delete('/api/delete/postcomments', verifyToken,(req, res, next) => {
  const post_id = req.body.post_id
  pool.query(`DELETE FROM comments
              WHERE post_id = $1`, [post_id],
              (q_err, q_res) => {
                  res.json(q_res.rows)
                  console.log(q_err)
        })
})

// router.delete('/api/delete/post/:pid', verifyToken,(req, res, next) => {
//   const pid = req.params.pid
//   pool.query(`DELETE FROM posts WHERE pid = $1`, [ pid ],
//               (q_err, q_res) => {
//                 res.json(q_res.rows)
//                 console.log(q_err)
//        })
// })

  router.delete('/api/delete/post/:post_id', verifyToken, deletePost)
/*
    COMMENTS ROUTES SECTION
*/


router.post('/api/post/commenttodb', verifyToken,(req, res, next) => {
  const values = [ req.body.comment, req.body.user_id, req.body.username, req.body.post_id]

  pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
              VALUES($1, $2, $3, $4, NOW())`, values,
              (q_err, q_res ) => {
                  res.json(q_res.rows)
                  console.log(q_err)
      })
})

router.put('/api/put/commenttodb', verifyToken,(req, res, next) => {
  const values = [ req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]

  pool.query(`UPDATE comments SET
              comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW()
              WHERE cid=$5`, values,
              (q_err, q_res ) => {
                  res.json(q_res.rows)
                  console.log(q_err)
      })
})


router.delete('/api/delete/comment', verifyToken,(req, res, next) => {
  const cid = req.body.comment_id
  console.log(cid)
  pool.query(`DELETE FROM comments
              WHERE cid=$1`, [ cid ],
              (q_err, q_res ) => {
                  res.json(q_res)
                  console.log(q_err)
      })
})


router.get('/api/get/allpostcomments', verifyToken,(req, res, next) => {
  const post_id = String(req.query.post_id)
  pool.query(`SELECT * FROM comments
              WHERE post_id=$1`, [ post_id ],
              (q_err, q_res ) => {
                  res.json(q_res.rows)
      })
})


/*
  USER PROFILE SECTION
*/

router.post('/api/auth/register',registerUser)  
router.post('/api/auth/login', loginUser )
router.get('/api/auth/', verifyToken, getUser)


// router.post('/api/posts/userprofiletodb', (req, res, next) => {
  
//   const values = [req.body.username, req.body.email]
//   pool.query(`INSERT INTO users(username, email, email_verified, date_created)
//               VALUES($1, $2, NOW())
//               ON CONFLICT DO NOTHING`, values,
//               (q_err, q_res) => {
//                 res.json(q_res.rows)
//       })
// } )

// router.post('/api/get/userprofilefromdb', (req, res, next) => {
//   const email = req.body.email
//   const password = req.body.password
//   console.log(email)
//   pool.query(`SELECT * FROM users
//               WHERE email=$1`, [ email ],
//               (q_err, q_res) => {
//                 res.json(q_res.rows)
//       })
// } )
router.get('/api/get/userposts', verifyToken,(req, res, next) => {
  const user_id = req.query.user_id
  console.log(user_id)
  pool.query(`SELECT * FROM posts
              WHERE user_id=$1`, [ user_id ],
              (q_err, q_res) => {
                res.json(q_res.rows)
      })
} )

router.put('/api/put/likes', verifyToken,(req, res, next) => {
  const uid = [req.body.uid]
  const post_id = String(req.body.post_id)

  const values = [ uid, post_id ]
  console.log(values)
  pool.query(`UPDATE posts
              SET like_user_id = like_user_id || $1, likes = likes + 1
              WHERE NOT (like_user_id @> $1)
              AND pid = ($2)`,
     values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});


//Search Posts
router.post('/api/get/searchpost', verifyToken,(req, res, next) => {
  search_query = String(req.body.search_query)
  pool.query(`SELECT * FROM posts
              WHERE search_vector @@ to_tsquery($1)`,
    [ search_query ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

//Save posts to db
router.post('/api/post/posttodb',verifyToken, (req, res, next) => {
  const body_vector = String(req.body.body)
  const title_vector = String(req.body.title)
  const username_vector = String(req.user.username)

  const search_vector = [title_vector, body_vector, username_vector]
  const values = [req.body.title, req.body.body, search_vector, req.user.id, req.user.username]
  pool.query(`INSERT INTO
              posts(title, body, search_vector, user_id, author, date_created)
              VALUES($1, $2, to_tsvector($3), $4, $5, NOW())`,
    values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});


/* Retrieve another users profile from db based on username */
router.get('/api/get/otheruserprofilefromdb', verifyToken,(req, res, next) => {
  // const email = [ "%" + req.query.email + "%"]
  const username = String(req.query.username)
  pool.query(`SELECT * FROM users
              WHERE username = $1`,
    [ username ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

router.get('/search-users', verifyToken,(req, res, next) => {
   const email = [ "%" + req.query.email + "%"]
  // let userPattern = new RegExp("^"+req.body.query)
  // const email = userPattern  
  pool.query(`SELECT * FROM users WHERE email = $1`,
    [ email ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});



//Get another user's posts based on username
router.get('/api/get/otheruserposts', verifyToken,(req, res, next) => {
  const username = String(req.query.username)
  pool.query(`SELECT * FROM posts
              WHERE author = $1`,
    [ username ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

//Send Message to db
router.post('/api/post/messagetodb', verifyToken,(req, res, next) => {

  const from_username = String(req.body.message_sender)
  const to_username = String(req.body.message_to)
  const title = String(req.body.title)
  const body = String(req.body.body)

  const values = [from_username, to_username, title, body]
  pool.query(`INSERT INTO messages(message_sender, message_to, message_title, message_body, date_created)
              VALUES($1, $2, $3, $4, NOW())`,
    values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Get another user's posts based on username
router.get('/api/get/usermessages', verifyToken,(req, res, next) => {
  const username = String(req.query.username)
  console.log(username)
  pool.query(`SELECT * FROM messages
              WHERE message_to = $1`,
    [ username ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

//Delete a message with the message id
router.delete('/api/delete/usermessage', verifyToken,(req, res, next) => {
  const mid = req.body.mid
  pool.query(`DELETE FROM messages
              WHERE mid = $1`,
    [ mid ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

router.post("/api/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified) return res.json(false);

    const find_by_id = `SELECT email FROM users WHERE uid=$1`
    const uid = [req.user.uid]

    //const user = await User.findById(verified.id);

    const user = await pool.query(find_by_id, uid)
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/users', verifyToken,async(req, res) => {
  try {
    const email = [req.user.email]
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, email)
    res.json({ 
      username:user.username, 
      id: user.id,})
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
})
module.exports = router
