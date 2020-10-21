const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, DATABASE_URL} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
async function registerUser(req, res) {
  const {username, email, email_verified,password} = req.body
  const better_user = username
  const validEmail = email
  const verified_email =(email===email_verified) ? true: false
  const checkFields = username &&  email && email_verified && password
  const hashedPassword  = bcrypt.hashSync(password, 12)

  const find_by_username = `SELECT * FROM users WHERE username=$1`
  const find_by_email = `SELECT * FROM users WHERE email=$1`
  const existing_username = await pool.query(find_by_username,[better_user])
  const existing_email = await pool.query(find_by_email, [validEmail])
  
  if(!verified_email){
    res.status(400).json({
      status: 'error',
      Error: 'Email did not match!',
    });
  }else if (!checkFields) {
    res.status(400).json({
      status: 'error',
      error: 'All fields are required',
    });
  }else if (existing_email || existing_username) {
    res.status(400).json({
      status: 'error',
      error: 'User already exists!',
    });
  }
  else{
  const register_user_query = `INSERT INTO users(username, email, email_verified, password,date_created) VALUES($1, $2, $3, $4,NOW()) ON CONFLICT DO NOTHING`
  const values = [better_user, validEmail, verified_email, hashedPassword]
  const new_user = await pool.query(register_user_query, values)
  const {username, email} = new_user
  try {
    res.status(200).json({
      status: 'success',
      data: {
        username, email
      },
    }) 
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: 'Failed to create new user',
    })
  }
}
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const checkFields = email && password
    if (!checkFields) {
        res.status(400).json({
          status: 'error',
          error: 'Email and password fields are required',
        });
      }
      const find_user_query = `SELECT * FROM users WHERE email=$1`
      const find_user = await pool.query(find_user_query, [email]) 
      const User = find_user.rows[0]
      // const {uid, username, userMail: email, hashedPassword: password} = find_user
      //const verifyPwd  = await Helper.comparePassword(password.trim(), hashedPassword)

      const verifyPwd = bcrypt.compareSync( password, User.password);
      

      if (!verifyPwd) {
        res.status(400).json({
          status: 'error',
          message: 'Incorrect password',
        });
      }
      const userObj = {
        sub: User.uid,
        username: User.username
      }
      
      const token = jwt.sign({ userObj }, JWT_SECRET);

      try {
        res.status(200).json({
            status: 'success',
            data: {
              token,
              User,
            },
          }) 
      } catch (error) {
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user',
          });
      }
}

async function getUserPosts(req, res) {   
    const user_id = req.query.user_id
    const user_post_query = `SELECT * FROM posts WHERE user_id = $1`
    const user_post = await pool.query(user_post_query, [user_id])
    const Posts = user_post.rows
    const postsarr = []
    await Posts.forEach(element => {
        const { title, body, date_created} = element
        const values = {title, body, date_created}   
        postsarr.push(values)     
    });
    try {
        res.status(200).json({
            status: 'success',
            data: postsarr,
          }) 
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user posts',
          });
    }
}

async function getOtherUserPosts(req, res) {   
    
    const username = String(req.query.username)
    const user_post_query = `SELECT * FROM posts WHERE author = $1`
    const user_post = await pool.query(user_post_query, [username])
    const Posts = user_post.rows
    const postsarr = []
    await Posts.forEach(element => {
        const {title, body, date_created} = element
        const values = {title, body, date_created}   
        postsarr.push(values)     
    });
    try {
        res.status(200).json({
            status: 'success',
            data: postsarr,
          }) 
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user posts',
          });
    }
}


async function getOtherUserProfile(req, res) {
    const username = req.body.username
    const other_profile_query = `SELECT * FROM users WHERE username = $1`
    const user_profile = await pool.query(other_profile_query, [username])
    const profile = user_profile.rows[0]
    // const {uid, username, email, date_created, last_login} = user_profile
    if(!profile){
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user',
          });
    }
    try {
        res.status(200).json({
            status: 'success',
            data: {
               profile
            },
          }) 
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user',
          });
    }
}

module.exports = {registerUser, loginUser,  getUserPosts, getOtherUserPosts, getOtherUserProfile}