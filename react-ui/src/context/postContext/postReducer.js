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
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          error: null
        }
      case ADD_POST:
        return {
          ...state,
          posts: [...state.posts, payload]
        }
      case REMOVE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload)
        }
      case EDIT_POST:
        return {
          ...state,
          editPost: payload
        }
      case CLEAR_EDIT:
        return {
          ...state,
          editPost: null
        }
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map(post => post._id === payload._id ? payload : post)
        }
      case TOGGLE_POSTFILTER:
        return {
          ...state,
          postFilter: !state.postFilter
        }
      case SEARCH_POST:
        const regex = new RegExp(`${payload}`, 'gi')
        return {
          ...state,
          searchPost: state.posts.filter(post => post.name.match(regex))
        }
      case CLEAR_SEARCH:
        return {
          ...state,
          searchPost: null
        }
      case POSTS_ERROR:
        return {
          ...state,
          error: payload,
        }
      case CLEAR_POSTS:
        return {
          ...state,
          POSTFilter: false,
          searchPost: null,
          editPost: null,
          posts: [],
          error: null
        }
      default:
        return state
    }
  }