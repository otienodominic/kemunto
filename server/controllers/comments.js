const pool = require('../database')
// pool.connect();

async function postComment(req, res) {
    const values = [ req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
    const post_comment_query = `INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())`
    const post_comment = await pool.query(post_comment_query, values)
    try {
        res.status(201).json({
            status: 'success',
            data: post_comment.rows ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to save comment',
          });
    }
}

async function updateComment(req, res) {
    const values = [ req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
    const update_comment_query = `UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW() WHERE cid=$5`
    const updated_comment = await pool.query(update_comment_query, values)
    const {username, comment} = updated_comment
    const new_comment = {username, comment} 
    try {
        res.status(201).json({
            status: 'success',
            data: new_comment ,
          });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to save comment',
          });
    }

}
async function deleteComment(req, res) {
    const cid = req.body.comment_id
    const delete_comment_query = `DELETE FROM comments WHERE cid=$1`
     await pool.query(delete_comment_query, [cid])
    if(!cid || cid ===''){
        res.status(400).json({
            status: 'error',
            error: 'No comment selected',
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

async function getAllPostComments(req, res) {
    const post_id = String(req.query.post_id)
    const get_all_comments_query = `SELECT * FROM comments WHERE post_id=$1`
    const get_all_comments = await pool.query(get_all_comments_query, [post_id])
    if(get_all_comments.rowCount < 1){
        res.status(400).json({
            status: "error",
            message: "No comments available"
        })
    }
    const commentsarr = []
    await get_all_comments.forEach(element => {
        const { comment, author, date_created} = element
        const values = {comment, author, date_created}   
        commentsarr.push(values)     
    });
    try {
        res.status(200).json({
            message: "Success",
            data: commentsarr,
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to get comments!"
        })
    }
}
module.exports = {postComment, updateComment, deleteComment, getAllPostComments}