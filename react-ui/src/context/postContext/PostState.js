import React, {useReducer}from 'react'
import axios from 'axios'
import PostContext from './PostContext'
import PostReducer from './PostReducer'
import {GET_POST, GET_POSTS, SUCCESS, POST_ERROR} from './types'

function PostState(props) {
    const initialState ={
        post: {},
        posts: [],
        loading: true,
        error: null,
        success: null
    }
const [state, dispatch] = useReducer(PostReducer, initialState)
// Get Single file
const getPost = async (postId) => {
    try {
      const res = await axios.get(`/api/v1/post/${postId}`)     
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    } catch (error) {
      const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.msg ||
            error.toString();
      dispatch({
        type: POST_ERROR,
        payload: resMessage
      })
    }
  }


const getPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts')     
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    } catch (error) {
      const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.msg ||
            error.toString();
      dispatch({
        type: POST_ERROR,
        payload: resMessage
      })
    }
  }


    return (
        <PostContext.Provider value={{
            post: state.post,
            posts: state.posts,
            success: state.success,
            error: state.error,
            getPost,
            getPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState
