import React, { useReducer } from 'react'
import axios from 'axios'
import PostsContext from './postsContext'
import PostsReducer from './postsReducer'
import { 
    GET_POSTS, 
    GET_TRENDING,
    GET_POST,   
    POSTS_ERROR
} from '../types'



export default function PostsState(props) {
    const initialState = {
        posts:[],
        post: {},
        trending: [],
        recent: [],
        featured: [],
        error: null
    }
    const [state, dispatch] = useReducer(PostsReducer, initialState)

    // Get posts from backend here:
    const getPosts = async()=>{
      try {
        const res = await axios.get('/api/v1/posts') 
        dispatch({
            type: GET_POSTS,
            payload: res.data
        }) 
      }catch(error){
          const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.msg ||
          error.toString();
    dispatch({
      type: POSTS_ERROR,
      payload: resMessage
    })
      }
  }


    const getPost = async(id)=>{
        try {
          // const headers = { headers: { Authorization: `Bearer ${token}` } }
          const res = await axios.get(`/api/v1/post/${id}`) 
          dispatch({
              type: GET_POST,
              payload: res.data
          }) 
        }catch(error){
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.msg ||
            error.toString();
      dispatch({
        type: POSTS_ERROR,
        payload: resMessage
      })
        }
    }
    
    const getTrending = async()=>{
        try {
          const res = await axios.get('/api/v1/trending') 
          dispatch({
              type: GET_TRENDING,
              payload: res.data
          }) 
        }catch(error){
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.msg ||
            error.toString();
      dispatch({
        type: POSTS_ERROR,
        payload: resMessage
      })
        }
    }

    return (
        <PostsContext.Provider value={{
            posts: state.posts,
            post: state.post,
            trending: state.trending,
            // recent: state.recent,
            featured: state.featured,
            error: state.error,
            getPost,
            getTrending,
            getPosts
        }}>     
         {props.children}       
        </PostsContext.Provider>
    )
}
