import React, { useReducer } from 'react'
import axios from 'axios'
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  TOGGLE_POSTFILTER,
  SEARCH_POST,
  CLEAR_SEARCH,
  REMOVE_POST,
  ADD_POST,
  EDIT_POST,
  CLEAR_EDIT,
  UPDATE_POST,
  GET_POSTS,
  POSTS_ERROR,
  CLEAR_POSTS
} from '../types'

const PostState = (props) => {
  const intialState = {
    postFilter: false,
    searchPost: null,
    editPost: null,
    posts: [],
    error: null,
  }
  const [state, dispatch] = useReducer(postReducer, intialState)

  // get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/get/allposts')
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.response.message
      })
    }
  }

  // Add Post 

  const addPost = async (post) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/api/post/posttodb', post, config)
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.response.message
      })
    }
  }


  // remove Post 
  const removePost = async (post_id) => {
    try {
      await axios.delete(`/api/delete/post/${post_id}`)
      dispatch({
        type: REMOVE_POST,
        payload: post_id
      })
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.response.message
      })
    }
  }

  // update Post

  const update_Post = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/post/posttodb/${post.pid}`, post, config)
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
      getPosts()

    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.response.message        
      })
    }
  }

  //toggle isconfirmed
  const togglePostFilter = () => {
    dispatch({
      type: TOGGLE_POSTFILTER
    })
  }

  // Search Post
  const search_Post = (post) => {
    dispatch({
      type: SEARCH_POST,
      payload: post
    })
  }
  const clearSearchPost = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit Post 
  const edit_Post = (post) => {
    dispatch({
      type: EDIT_POST,
      payload: post
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearPosts = () => {
    dispatch({
      type: CLEAR_POSTS
    })
  }
  return (
    <PostContext.Provider value={{
      posts: state.posts,
      postFilter: state.postFilter,
      searchPost: state.searchPost,
      editPost: state.editPost,
      error: state.error,
      loading: state.loading,
      addPost,
      removePost,
      edit_Post,
      clearEdit,
      update_Post,
      togglePostFilter,
      search_Post,
      clearSearchPost,
      getPosts,
      clearPosts
    }} >
      {props.children}
    </PostContext.Provider >
  )
}

export default PostState