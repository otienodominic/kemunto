const pool = require('../database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {hashPassword, comparePassword, isValidEmail, generateToken} = require('../helpers')
// const {JWT_SECRET} = require('../config')

// pool.connect();

async function registerUser(req, res) {
  const values = [req.body.username, req.body.email, req.body.email_verified, req.body.password]
  const register_user_query = `INSERT INTO users(username, email, email_verified, password,date_created) VALUES($1, $2, $3, $4,NOW()) ON CONFLICT DO NOTHING`
  const new_user = await pool.query(register_user_query, values)
  try {
    res.status(200).json({
      status: 'success',
      data: new_user.rows,
    }) 
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: 'Failed to create new user',
    })
  }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        res.status(400).json({
          status: 'error',
          error: 'Email and password fields are required',
        });
      }
      const find_user_query = `SELECT * FROM users WHERE email=$1`
      const find_user = await pool.query(find_user_query, [email]) 
      // const {uid, username, userMail: email, hashedPassword: password} = find_user
      const verifyPwd  = await Helper.comparePassword(password.trim(), hashedPassword)
      if (!verifyPwd) {
        res.status(400).json({
          status: 'error',
          error: 'Incorrect password',
        });
      }
      const userObj = {
        sub: uid,
        role: username
      }
      const token = await Helper.generateToken(userObj);

      try {
        res.status(200).json({
            status: 'success',
            data: {
              token,
              UserName: username,
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

    const postsarr = []
    await user_post.forEach(element => {
        const {pid, title, body, date_created} = element
        const values = {pid, title, body, date_created}   
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

    const postsarr = []
    await user_post.forEach(element => {
        const {pid, title, body, date_created} = element
        const values = {pid, title, body, date_created}   
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
    const username = String(req.query.username)
    const other_profile_query = `SELECT * FROM users WHERE username = $1`
    const user_profile = await pool.query(other_profile_query, [username])
    // const {uid, username, email, date_created, last_login} = user_profile
    if(user_profile.rowCount < 1){
        res.status(400).json({
            status: 'error',
            error: 'Failed to get user',
          });
    }
    try {
        res.status(200).json({
            status: 'success',
            data: {
                uid, 
                username, 
                email, 
                date_created, 
                last_login
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