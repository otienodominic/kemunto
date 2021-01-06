import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import NoteContainer from './NoteContainer';
import { withRouter } from 'react-router-dom';
// import PostContext from '../../context/postContext/postContext'
import AuthContext from '../../context/authContext/authContext'

const VideoNoteContainer = (props) => {  
  const [post, setPost] = useState(null);
  const {isAuthencated} = useContext(AuthContext)

  let urlBase = '/api/post/posttodb/';

  const save = async (post) => {
    const { title, body } = post;
    
    let url = urlBase;
    // if(type === 'PUT') {
    //   url += pid;
    // }    
    let reqBody = JSON.stringify({
      title: title,
      body: body,    
      
    });
    console.log(reqBody);
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      },
      body: reqBody
    });

    const json = await response.json();
    setPost(json);
  }

  return (
    <>      
        <Grid 
        container 
        direction='row' 
        justify='space-around' 
        alignItems='center' 
        style={{maxHeight: '100%', height: '100%', padding: '10px'}}>        
          <NoteContainer post={post} {...props} handleSave={(post) => save(post)}/>
      </Grid>) 
    </>
  )

}

export default withRouter(VideoNoteContainer);