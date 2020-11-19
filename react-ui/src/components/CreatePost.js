import React, { useState, useRef } from "react";
import { FormControl, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../services/user.service'
import { Link } from 'react-router-dom';
import history from '../utils/history'

const useStyles = makeStyles({
  root: {
    
    border: 0,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'purple',
    height: 418,
    padding: '0 30px',
  },
});



const createPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");  
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeBody = (e) => {
    const body = e.target.value;
    setBody(body);
  };
  const handleSubmit = (event) => {
    event.preventDefault()      
    setMessage("");
    setSuccessful(false);
      UserService.createPost(title, body).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      )
  }
    return(   
      <div>
     <form className={classes.root} onSubmit={handleSubmit}>            
      {!successful &&(
      <div>   
      <div>
        <TextField          
          label="Title"
          type="text"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          color='primary'
          rows={1}
          value={title}
          onChange={onChangeTitle}
          required={true}
        />        
      </div>
      <div>
        <TextField
          id="outlined-full-width"
          label="Body"
          style={{ margin: 8, textAlign: 'left' }}
          type="text"
          value={body}
          fullWidth
          multiline 
          onChange={onChangeBody}           
          required={true}  
          rows={10}           
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />        
      </div>   
      <button type="submit">Submit Post</button> 
      </div>
     )}
     {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
  </form>  
  <br />
  <button onClick={() => history.replace('/posts')}> Cancel </button>   
  </div>
  )}


export default createPost;

