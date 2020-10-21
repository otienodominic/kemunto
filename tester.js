const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, DATABASE_URL} = require('./server/config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
const email = 'moro@hotmail.com'

 


async function user(req, res) {
  const find_user_query = `SELECT * FROM users WHERE email=$1`
  const find_user = await pool.query(find_user_query, [email])
  try {
    
   return find_user.rows
  
  } catch (error) {
    return "error"
  }
}
console.log(user())