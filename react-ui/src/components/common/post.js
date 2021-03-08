import React, {useContext, useEffect,useState} from 'react'
import PostContext from '../../context/postContext/PostContext'

function Post() {
    const {getPost} = useContext(PostContext)
    const [post, setPost] = useState({})
    useEffect(()=>{
       setPost(getPost(7))
    },[])

    return (
        <div>
            {post.title}
        </div>
    )
}

export default Post
