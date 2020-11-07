import React, { useContext, useState } from 'react';
import axios from 'axios';
import history from '../utils/history';
// import Context from '../utils/context';

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import AuthService from "../services/auth.service";
import UserService from '../services/user.service'

import '../App.css'

const {getCurrentUser} = AuthService
const {editPost, getOnePost} = UserService


const EditPost = (props) => {
  const currentUser = getCurrentUser()
  const currentPost = getOnePost()

  const [stateLocal, setState] = useState({ title: currentPost.title,
                                            body: currentPost.body
                                          })


  const handleTitleChange = (event) => {
    setState({...stateLocal, title: event.target.value })
  }

  const handleBodyChange = (event) => {
    setState({...stateLocal, body: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const user_id = currentUser.uid
    const username = currentUser.username
    const pid = currentPost.pid
    const title = event.target.title.value
    const body = event.target.body.value

    const data = {title: title,
                  body: body,
                  pid: pid,
                  uid: user_id,
                  username: username
                 }
    axios.put("/api/put/post", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(setTimeout(() => history.replace('/home'), 700 ))
  }


    return(
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id='title'
              label='title'
              margin="normal"
              value={stateLocal.title}
              onChange={handleTitleChange}
            />
            <br />
            <TextField
              id='body'
              label='body'
              multiline
              rows="4"
              margin='normal'
              value={stateLocal.body}
              onChange={handleBodyChange}
              />
          <br />
          <button type="submit"> Submit </button>
          </form>
          <br />
          <Button onClick={() => history.goBack()}> Cancel </Button>
        </div>
    )}



export default EditPost;