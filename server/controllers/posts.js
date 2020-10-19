const pool = require('../database')
pool.connect();

// get all posts

async function getAllPosts(req, res) {
    const get_posts_query = `SELECT * FROM posts ORDER BY date_created DESC`;
    const all_posts = await pool.query(get_posts_query)
    if(all_posts.rowCount < 1){
        res.status(400).json({
            status: "error",
            message: "No posts available"
        })
    }
    const postsarr = [];
    await all_posts.forEach(element => {
        const {pid, title, body, author, date_created} = element
        const values = {pid, title, body, author, date_created}   
        postsarr.push(values)     
    });
    try {
        res.status(200).json({
            message: "Success",
            data: postsarr,
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to get posts!"
        })
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
    if(one_post.rowCount < 1){
        res.status(400).json({
            status: "error",
            message: "No post available"
        })
    }
    const {pid, title, body, author, date_created} = one_post
        const values = {pid, title, body, author, date_created}
    try {
        res.status(200).json({
            message: "Success",
            data: values,
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to get post!"
        })
    }
}

async function createPost(req, res) {
    const values = [ req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    const insert_post_query = `INSERT INTO posts(title, body, user_id, author, date_created) VALUES($1, $2, $3, $4, NOW())`
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

async function editPost(req, res) {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    if(!values){
        res.status(400).json({
            status: 'error',
            error: 'Title and article fields are required',
          });
    }
    const update_post_query = `UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid = $4`
    const update_post = await pool.query(update_post_query, values)
    try {
        res.status(201).json({
            status: 'success',
            data: update_post.rows ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to save post',
          });
    }
}