import {
    TOGGLE_FILEFILTER,
    SEARCH_FILE,
    CLEAR_SEARCH,
    REMOVE_FILE,
    ADD_FILE,
    EDIT_FILE,
    CLEAR_EDIT,
    UPDATE_FILE,
    GET_FILES,
    FILES_ERROR,
    CLEAR_FILES,
    CLEAR_ERRORS,
    
  } from '../types'
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_FILES:
        return {
          ...state,
          files: payload,
          error: null
        }
      case ADD_FILE:
        return {
          ...state,
          files: [...state.files, payload]
        }
      case REMOVE_FILE:
        return {
          ...state,
          files: state.files.filter(file => file._id !== payload)
        }
      case EDIT_FILE:
        return {
          ...state,
          editFile: payload
        }
      case CLEAR_EDIT:
        return {
          ...state,
          editFile: null
        }
      case UPDATE_FILE:
        return {
          ...state,
          files: state.files.map(file => file._id === payload._id ? payload : file),
          success: payload
        }
      case TOGGLE_FILEFILTER:
        return {
          ...state,
          fileFilter: !state.fileFilter
        }
      case SEARCH_FILE:
        const regex = new RegExp(`${payload}`, 'gi')
        return {
          ...state,
          searchFile: state.files.filter(file => file.patientName.match(regex))
        }
      case CLEAR_SEARCH:
        return {
          ...state,
          searchFile: null
        }
      case FILES_ERROR:
        return {
          ...state,
          error: payload,
        }
        case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      case CLEAR_FILES:
        return {
          ...state,
          fileFilter: false,
          searchFile: null,
          editFile: null,
          files: [],
          error: null
        }
      default:
        return state
    }
  }