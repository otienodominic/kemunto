const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, DATABASE_URL} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  

// get all posts

async function getAllPosts(req, res) {
    const get_posts_query = `SELECT * FROM posts ORDER BY date_created DESC`;
    const all_posts = await pool.query(get_posts_query)
    const posts = all_posts.rows
    if(!posts){
        res.status(400).send({ message: 'No posts available' }) 
       
    }
    const postsarr = [];
    posts.forEach(element => {
        const {pid, title, body, author, date_created} = element
        const values = {pid, title, body, author, date_created}   
        postsarr.push(values)     
    });
    try {    
        res.status(200).send(            
            postsarr,
        )        
    } catch (error) {
        res.status(400).send({ message: 'Failed to get posts' })         
    }
}

async function getOnePost(req, res) {
    const post_id = req.query.post_id    
    if(!post_id || post_id === ''){
        res.status(400).json({    
            status: 'error',        
            message: 'Invalid request',
          });
    }
    const one_post_query = `SELECT * FROM posts WHERE pid=$1`
    const one_post = await pool.query(one_post_query)
    const single_post = one_post.rows[0]
    if(!single_post){
        res.status(400).json({
            status: "error",
            message: "No post available"
        })
    }    
    try {
        res.status(200).json({
            message: "Success",
            data: single_post,
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to get post!"
        })
    }
}

async function createPost(req, res) {
    const user_id = req.user.uid
    const author = req.user.username
    const values = [ req.body.title, req.body.body, user_id, author]

    const insert_post_query = `INSERT INTO posts(title, body, user_id, author,date_created) VALUES($1, $2, $3, $4, NOW())`
    const creatPost = await pool.query(insert_post_query, values)
    try {
        res.status(201).json({
            status: 'success',
            data:creatPost.rows ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to save post',
          });
    }
}

async function updatePost(req, res) {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    if(!req.body.title || !req.body.body || !req.body.uid || !req.body.pid || !req.body.username){
        res.status(400).json({
            status: 'error',
            error: 'Title and article fields are required',
          });
    }
    const update_post_query = `UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid = $4`
    const update_post = await pool.query(update_post_query, values)    
    const new_post = update_post.rows
    try {
        res.status(201).json({
            status: 'success',
            data: new_post ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to save post',
          });
    }
}

async function deletePostComment(req, res) {
    const post_id = req.body.post_id
    const delete_comment_query = `DELETE FROM comments WHERE post_id = $1`
    await pool.query(delete_comment_query, [post_id])
    if(!post_id || post_id===''){
        res.status(400).json({
            status: 'error',
            error: 'No comment selected',
          });
    }
    try {
        res.status(200).json({
            status: 'success',
            message: 'comment deleted successfully' ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete comment',
          });
    }
}

async function deletePost(req, res) {
    const post_id = req.body.post_id
    const delete_comment_query = `DELETE FROM posts WHERE pid = $1`
    await pool.query(delete_comment_query, [post_id])
    if(!post_id || post_id===''){
        res.status(400).json({
            status: 'error',
            error: 'No post selected',
          });
    }
    try {
        res.status(200).json({
            status: 'success',
            message: 'post deleted successfully' ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete post',
          });
    }
}

async function updateLikes(req, res) {
    const uid = [req.body.uid]
    const post_id = String(req.body.post_id)
    const values = [ uid, post_id ]
    const update_likes_query = `UPDATE posts SET like_user_id = like_user_id || $1, likes = likes + 1  WHERE NOT (like_user_id @> $1) AND pid = ($2)`
    const likes = await pool.query(update_likes_query, values)
    try {
        res.status(200).json({
            status: 'success',
            likes: likes.rows ,
          });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to like post',
          });
    }

    
}
module.exports = { getAllPosts,getOnePost, createPost, updatePost, deletePostComment, deletePost, updateLikes}