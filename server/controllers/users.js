const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, DATABASE_URL} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
async function registerUser(req, res) {
  const {username, email, email_verified, password} = req.body
  // Check Duplicate email
  const dublicate_email = (await pool.query(`SELECT * FROM users WHERE email = $1`,[email])).rowCount
  if(dublicate_email){
    return res.status(400).send({ message: 'User already exists please login!' })
  }
  const checkFields = username &&  email && password
  const hashedPassword  = bcrypt.hashSync(password, 12)    
  
  if (!checkFields) {
    res.status(400).send({ message: 'All fields are required' })     
  }
  if(!email_verified){
    res.status(400).send({ message: 'Email did not match!' })
  }  
  else{
  const register_user_query = `INSERT INTO users(username, email, email_verified ,password, date_created) VALUES($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING`
  const values = [username, email, email_verified ,hashedPassword]
  
  await pool.query(register_user_query, values)  
  try {    
    res.send({ message: 'success user saved' })
  } catch (error) {
    res.status(400).send({ message: 'Failed to create user' })
    
  }
}
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const checkFields = email && password
    if (!checkFields) {
      res.status(400).send({ message: 'All fields are required' })        
      }
      const find_user_query = `SELECT * FROM users WHERE email=$1`
      const find_user = await pool.query(find_user_query, [email])       

      const verifyPwd = bcrypt.compareSync(password, find_user.rows[0].password);      

      if (!verifyPwd) {
        res.status(400).send({ message: 'email or password is incorrect!' })        
      }   
      else{
        // update login date  
      const update_date_query = `UPDATE users SET last_login=NOW() WHERE email=$1`
      await pool.query(update_date_query,[email])
      }
      
      const token = jwt.sign({
        id: find_user.rows[0].uid,
        username: find_user.rows[0].username,
        email: find_user.rows[0].email }, JWT_SECRET);
      
      try {
        res.status(200).send({
            message: "Login Successful!",
            id: find_user.rows[0].uid,
            username: find_user.rows[0].username,
            email: find_user.rows[0].email, 
            email_verified: find_user.rows[0].email_verified,           
            accessToken: token
          });
      } catch (error) {
        res.status(400).send({ message: 'Failed to get user' })
        
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

async function getUser(req, res){
  const id = [req.user.id]
  const get_user_query = `SELECT uid,username, email FROM users WHERE uid = $1`
  const user = await pool.query(get_user_query, id)
  
  try {
    res.status(200).json(      
    user.rows[0]
    ) 
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: 'Failed to get user',
    });
  }
}

module.exports = {registerUser, loginUser,  getUserPosts, getOtherUserPosts, getOtherUserProfile, getUser}