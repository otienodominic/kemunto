import React, {useContext, useEffect} from 'react'
// import PostFetch from '../components/common/post'
import moment from 'moment'
import PostContext from '../context/postContext/PostContext'

function Post() {   
     const {getPost, post} =useContext(PostContext) 
     const windowWidth = window.innerWidth 
   const postId = 6    
    useEffect(()=> {
        getPost(postId)
    }, [])
    // const imageBackground = `https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`
    const image =`https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`;

    // const style = windowWidth > 900 ? {...imageBackground, ...post.style} : imageBackground
    return (
        <main id='site-content'>
            <div className='row'>
                <div className= 'left-column'>
                    <div className='card'>
                        <h2>{post.title}</h2>
                        <h5>{post.description}{moment(post.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h5>
                        <img src={image} alt='imge here' />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Post
