import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/authContext/authContext'
import PostContext from '../../context/postContext/postContext'

export default function Home() {
    const { user, isAuthencated} = useContext(AuthContext)
    const context = useContext(PostContext)
    const {addPost, edit_Post, clearEdit, update_Post} = context

    useEffect(()=>{
        if(edit_Post!==null){ 
            setPost(edit_Post)
        }else{
            setPost({
                title:'',
                body: ''
            })
        }
    },[edit_Post, context])

    const [post, setPost] = useState({
        title: '',
        body: ''
    })
    
    const {title, body} = post

    const onchange = (e) => {
        setPost({
          ...post,
          [e.target.name]: e.target.value
        })
      }

      const onsubmit = (e) => {
        e.preventDefault();
        if (edit_Post === null) {
          addPost(post);
    
        } else {
          update_Post(post)
          clearEdit()
        }
        setPost({
            title:'',
            body: '',
        })
      }
    return (
        <div  className="app-container">            
         {isAuthencated ? "Welcome Home Dominic":"You must Log in Omera"}  
        </div>
    )
}