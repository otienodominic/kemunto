const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DATABASE_URL} = require('../config')
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: DATABASE_URL,
  });
  

// get all posts   



module.exports = {
    all_posts: async(req, res) => { 
        const posts_query = `SELECT blog_posts.id,
        blog_posts.description,
        blog_posts.author_id,
        users.first_name,
        users.last_name,
        blog_posts.title,
        blog_posts.image,
        created_at,
        updated_at,
        blog_categories.label as categories,
        array_to_string(array_agg(blog_categories.id), ',') as cat_ids
        FROM blog_posts
        left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
        left join blog_categories on blog_post_categories.category_id=blog_categories.id
        left join users on blog_posts.author_id=users.id
        where blog_posts.active = 1
        group by blog_posts.id, users.first_name, users.last_name, blog_categories.label`
         const posts = await pool.query(posts_query)
         try {
            return res.status(200).json(posts.rows)
         } catch (error) {
             throw error
         }
    },
    
    trending: async(req, res) => { 
            const trending_query = `SELECT blog_posts.id,
            blog_posts.description,
            blog_posts.author_id,
            users.first_name,
            users.last_name,
            title,
            image,
            created_at,
            updated_at,
            string_agg(label, ',' ) as categories,
            array_to_string(array_agg(blog_categories.id), ',') as cat_ids,
            COUNT(blog_post_likes.author_id) as likes
            FROM blog_posts
            left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
            left join blog_categories on blog_post_categories.category_id=blog_categories.id
            left join blog_post_likes on blog_post_likes.post_id = blog_posts.id
            left join users on blog_posts.author_id=users.id
            where blog_posts.active = 1
            group by blog_posts.id, users.first_name, users.lastname
            order by likes asc
            limit 5 `
             const trending_posts = await pool.query(trending_query)
             try {
                return res.status(200).json(trending_posts.rows)
             } catch (error) {
                 throw error
             }
        },
    one_post: async(req, res) => {
        const {id}=req.params 
        const featured_query = `SELECT blog_posts.id,
        blog_posts.description,
        blog_posts.author_id,
        users.first_name,
        users.last_name,
        blog_posts.title,
        blog_posts.image,
        created_at,
        updated_at       
        FROM blog_posts
        left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
        left join blog_categories on blog_post_categories.category_id=blog_categories.id
        left join users on blog_posts.author_id=users.id
        where blog_posts.active = 1 and blog_posts.id = ${id}
        `
            const featured_posts = await pool.query(featured_query)
            try {
            return res.status(200).json(featured_posts.rows[0])
            } catch (error) {
                throw error
            }
    },
    recent: async(req, res) => { 
        const recent_query = `SELECT blog_posts.id,
        blog_posts.description,
        blog_posts.author_id,
        users.first_name,
        users.last_name,
        title,
        image,
        created_at,
        updated_at,
        string_agg(label, ',' ) as categories,
        array_to_string(array_agg(blog_categories.id), ',') as cat_ids
        FROM blog_posts
        left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
        left join blog_categories on blog_post_categories.category_id=blog_categories.id
        left join users on blog_posts.author_id=users.id
        where blog_posts.active = 1
        group by blog_posts.id, users.first_name, users.last_name
        order by updated_at desc
        limit 5
        `  
             const recent_posts = await pool.query(recent_query)
             try {
                return res.status(200).json(recent_posts.rows)
             } catch (error) {
                 throw error
             }
        } 



        
    
}




// async function getAllPosts(req, res) {
//     const get_posts_query = `SELECT * FROM posts ORDER BY date_created DESC`;
//     const all_posts = await pool.query(get_posts_query)
//     const posts = all_posts.rows
//     if(!posts){
//         res.status(400).send({ message: 'No posts available' }) 
       
//     }
//     const postsarr = [];
//     posts.forEach(element => {
//         const {pid, title, body, author, date_created} = element
//         const values = {pid, title, body, author, date_created}   
//         postsarr.push(values)     
//     });
//     try {    
//         res.status(200).send(            
//             postsarr,
//         )        
//     } catch (error) {
//         res.status(400).send({ message: 'Failed to get posts' })         
//     }
// }

// async function getOnePost(req, res) {
//     const post_id = req.query.post_id    
//     if(!post_id || post_id === ''){
//         res.status(400).send({ message: 'Invalid request' }) 
//     }
//     const one_post_query = `SELECT * FROM posts WHERE pid=$1`
//     const one_post = await pool.query(one_post_query,[post_id])
//     const single_post = one_post.rows[0]
//     if(!single_post){
//         res.status(400).json({
//             status: "error",
//             message: "No post available"
//         })
//     }    
//     try {
//         res.status(200).json({
//             message: "Success",
//             data: single_post,
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to get post!"
//         })
//     }
// }

// async function createPost(req, res) {  

//     const {title, body,user_id, author} = req.body
//     const values = [ title, body, user_id, author]
//     const insert_post_query = `INSERT INTO posts(title, body,user_id, author, date_created) VALUES($1, $2, $3, $4, NOW())`
//     const creatPost = await pool.query(insert_post_query, values)
    
//     try {
//         res.send({ message: 'Post saved successfully!' })        
//     } catch (error) {
//         res.status(400).send({message: 'Failed to save post!'})        
//     }
// }

// async function updatePost(req, res) {
//     const {pid} = req.params
//     const {title, body, user_id}= req.body
//     const {id} = req.user.id
//     if(user_id !== id){
//         res.status(401).send({message: 'You are unauthorised to update this post!'})
//     }
//     const values = [title, body, pid]
//     if(!title || !body){
//         res.status(400).send({message: 'Title and article body fields are required!'})     
//        }
//     const update_post_query = `UPDATE posts SET title= $1, body=$2, date_created=NOW() WHERE pid = $3`
//     const update_post = await pool.query(update_post_query, values)    
    
//     try {
//         // res.send({ message: 'Post updated successfully!' })
//         res.json(update_post.rows)
//     } catch (error) {
//         res.status(400).send({message: 'Failed to update post!'})
//     }
// }

// async function deletePostComment(req, res) {
//     const post_id = req.body.post_id
//     const delete_comment_query = `DELETE FROM comments WHERE post_id = $1`
//     await pool.query(delete_comment_query, [post_id])
//     if(!post_id || post_id===''){
//         res.status(400).json({
//             status: 'error',
//             error: 'No comment selected',
//           });
//     }
//     try {
//         res.status(200).json({
//             status: 'success',
//             message: 'comment deleted successfully' ,
//           });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Failed to delete comment',
//           });
//     }
// }

// const deletePost = async(req, res)=> {
//     const post_id = req.params.post_id
//     const delete_comment_query = `DELETE FROM posts WHERE pid = $1`
//     await pool.query(delete_comment_query, [post_id])
//     // if(!post_id || post_id===''){
//     //     res.status(400).json({
//     //         status: 'error',
//     //         error: 'No post selected',
//     //       });
//     // }
//     try {
//         res.status(200).json({
//             status: 'success',
//             message: 'post deleted successfully' ,
//           });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Failed to delete post',
//           });
//     }
// }

// async function updateLikes(req, res) {
//     const uid = [req.body.uid]
//     const post_id = String(req.body.post_id)
//     const values = [ uid, post_id ]
//     const update_likes_query = `UPDATE posts SET like_user_id = like_user_id || $1, likes = likes + 1  WHERE NOT (like_user_id @> $1) AND pid = ($2)`
//     const likes = await pool.query(update_likes_query, values)
//     try {
//         res.status(200).json({
//             status: 'success',
//             likes: likes.rows ,
//           });
        
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Failed to like post',
//           });
//     }

    
// }

// // Get posts by a given user
// async function getMyPosts(req, res) {    
//     const {author} = req.body
//     const get_posts_query = `SELECT * FROM posts WHERE author=$1 ORDER BY date_created DESC`
//     const get_posts = await pool.query(get_posts_query, [author])
//     const user_posts = get_posts.rows

    
//     const posts = []
//     user_posts.forEach(element => {
//         const {title, body, date_created}=element
//         const values = {title, body, date_created}
//         posts.push(values)
//     })

//     try {    
//         res.status(200).send(            
//             posts,
//         )        
//     } catch (error) {
//         res.status(400).send({ message: 'Failed to get user posts' })         
//     }



// }
// module.exports = { getAllPosts,getOnePost, createPost, updatePost, deletePostComment, deletePost, updateLikes, getMyPosts}


// // trending:
// `SELECT blog_posts.id,
//     blog_posts.description,
//     blog_posts.author_id,
//     title,
//     image,
//     created_at,
//     updated_at,
//     string_agg(label, ',' ) as categories,
//     array_to_string(array_agg(blog_categories.id), ',') as cat_ids,
//     COUNT(blog_post_likes.author_id) as likes
//     FROM blog_posts
//     left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
//     left join blog_categories on blog_post_categories.category_id=blog_categories.id
//     left join blog_post_likes on blog_post_likes.post_id = blog_posts.id
//     where blog_posts.active = 1
//     group by blog_posts.id
//     order by likes asc
//     limit 5
// `

// // Featured:
// `
// SELECT blog_posts.id,
//     blog_posts.description,
//     blog_posts.author_id,
//     title,
//     image,
//     created_at,
//     updated_at,
//     string_agg(label, ',' ) as categories,
//    array_to_string(array_agg(blog_categories.id), ',') as cat_ids
//     FROM blog_posts
//     left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
//     left join blog_categories on blog_post_categories.category_id=blog_categories.id
//     where blog_posts.active = 1 and blog_posts.id in (1, 2, 3, 4)
//     group by blog_posts.id
// ` 

// // Default
// `SELECT blog_posts.id,
//         blog_posts.description,
//         blog_posts.author_id,
//         title,
//         image,
//         created_at,
//         updated_at,
//         string_agg(label, ',' ) as categories,
//        array_to_string(array_agg(blog_categories.id), ',') as cat_ids
//         FROM blog_posts
//         left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
//         left join blog_categories on blog_post_categories.category_id=blog_categories.id
//         where blog_posts.active = 1
//         group by blog_posts.id
//       `
//  // Recent Posts 
//  `SELECT blog_posts.id,
//         blog_posts.description,
//         blog_posts.author_id,
//         title,
//         image,
//         created_at,
//         updated_at,
//         string_agg(label, ',' ) as categories,
//        array_to_string(array_agg(blog_categories.id), ',') as cat_ids
//         FROM blog_posts
//         left join blog_post_categories on blog_posts.id=blog_post_categories.post_id
//         left join blog_categories on blog_post_categories.category_id=blog_categories.id
//         where blog_posts.active = 1
//         group by blog_posts.id
//         order by updated_at desc
//         limit 5
//         `