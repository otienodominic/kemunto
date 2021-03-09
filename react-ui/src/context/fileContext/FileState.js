import React, { useReducer } from 'react'
import axios from 'axios'
import FileContext from './FileContext';
import FileReducer from './FileReducer';
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

const FileState = (props) => {
  const intialState = {
    fileFilter: false,
    searchFile: null,
    editFile: null,
    files: [],
    error: null,
    success: null,
  }
  const [state, dispatch] = useReducer(FileReducer, intialState)

  // get Files

  const getFiles = async () => {
    try {
      const res = await axios.get('/api/get_all_files')
      dispatch({
        type: GET_FILES,
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
        type: FILES_ERROR,
        payload: resMessage
      })
    }
  }

  // Add File

  const addFile = async (file) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/api/create-file', file, config)
      dispatch({
        type: ADD_FILE,
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
        type: FILES_ERROR,
        payload: resMessage
      })
    }
  }


  // remove/delete File

  const removeFile = async (id) => {
    try {
      await axios.delete(`/api/delete-file/${id}`)
      dispatch({
        type: REMOVE_FILE,
        payload: id
      })
    } catch (error) {
      const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.msg ||
            error.toString();
      dispatch({
        type: FILES_ERROR,
        payload: resMessage
      })
    }
  }

  // update file

  const updateFile = async (file) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/update-file/${file._id}`, file, config)
      dispatch({
        type: UPDATE_FILE,
        payload: res.data.msg
      })
      getFiles()

    } catch (error) {
      const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.msg ||
            error.toString();
      dispatch({
        type: FILES_ERROR,
        payload: resMessage
      })
    }
  }

  //toggle isconfirmed
  const toggleFileFilter = () => {
    dispatch({
      type: TOGGLE_FILEFILTER
    })
  }
   // Clear Errors
   const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Search File
  const search_File = (file) => {
    dispatch({
      type: SEARCH_FILE,
      payload: file
    })
  }
  const clearSearchFile = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit File
  const edit_File = (file) => {
    dispatch({
      type: EDIT_FILE,
      payload: file
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearFiles = () => {
    dispatch({
      type: CLEAR_FILES
    })
  }
  return (
    <FileContext.Provider value={{
      files: state.files,
      fileFilter: state.fileFilter,
      searchFile: state.searchFile,
      editFile: state.editFile,
      error: state.error,
      success: state.success,
      loading: state.loading,
      addFile,
      removeFile,
      edit_File,
      clearEdit,
      updateFile,
      toggleFileFilter,
      search_File,
      clearSearchFile,
      getFiles,
      clearFiles,
      clearErrors
    }} >
      {props.children}
    </FileContext.Provider >
  )
}

export default FileState
