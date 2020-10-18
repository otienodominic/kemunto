const { Pool } = require('pg')
const {DATABASE_URL} = require('../config')

const pool = new Pool({DATABASE_URL: DATABASE_URL});
if(pool){
    console.log("connnected to Postgres database successfully")
}else{
    console.log('Database connection failed!')
}

module.exports = pool