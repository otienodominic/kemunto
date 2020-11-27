  
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'

import axios from 'axios';

import {Context} from "../../utils/context";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const Profile = () => {
  //const context = useContext(Context)
  const history = useHistory()
  const { userData } = useContext(Context);

  const [stateLocal, setState] = useState({ open: false,
                                            post_id: null,
                                            posts: []
                                          })
  useEffect(() => {
    const fetchPosts = async () => {
        const user_id = userData.id
        const all_posts = await axios.get('/api/get/userposts', {params: user_id})
        const posts = all_posts.data
        setState({...stateLocal,            
            posts: [...posts],            
            })
  }            
    fetchPosts()
}, []); 

const handleClickOpen = (pid) => {
    setState({open: true, post_id: pid })
  }

  const handleClickClose = () => {
    setState({open: false, post_id: null })
  }

  const DeletePost = () => {
    const post_id = stateLocal.post_id
    axios.delete('api/delete/postcomments', {data: { post_id: post_id }} )
      .then(() => axios.delete('/api/delete/post', {data: { post_id: post_id }} )
          .then(res => console.log(res) ) )
      .catch(err => console.log(err))
      .then(() => handleClickClose())
      .then(() => setTimeout(() => history.replace('/'), 700 ) )
  }

  const RenderProfile = () => {
    return(
      <div>
        <h1>{userData.username}</h1>
        <br />
        {/* <img src={props.profile.profile.picture} alt="" /> */}
        <br />
        <h4> {userData.email}</h4>
        <br />
        <h5> {userData.username} </h5>
        <br />
        <h6> Email Verified: </h6>
        {userData.email_verified ? <p>Yes</p> : <p>No</p> }
        <br />
      </div>

     )
   }
  

   const RenderPosts = post => (
    <div >
    <Card >  
      <CardHeader
        title={<Link to={{pathname:'/post/' + post.post.pid, state: {post}}}>
                  {post.post.title}
                </Link> }
        subheader={
            <div className="FlexColumn">
              <div className="FlexRow">
              {  moment(post.post.date_created).format('MMMM Do, YYYY | h:mm:s a') }
              </div>
              <div className="FlexRow">
                Posted By:
                <Link style={{paddingLeft: '5px', textDecoration: 'none'}}
                      to={{pathname:"/user/" + post.post.author, state:{post} }}>
                 { post.post.author }
                 </Link>
               </div>
               <div className="FlexRow">
                {/* <i className="material-icons">thumb_up</i> */}
                <div className="notification-num-allposts"> {post.post.likes} </div>
              </div>
            </div>
            }
          />
      <br />
      <CardContent>
        <span style={{overflow: 'hidden' }}> {post.post.body} </span>
      </CardContent>
    </Card>
    </div>
  )

 return(
          <div>
            <div>
            <Link to={{pathname:"/showmessages/" + userData.id }}>
             <Button variant="contained" color="primary" type="submit">
               Show Messages
              </Button>
            </Link>
            {RenderProfile}
            </div>
            <div>             

                {
                    stateLocal.posts_slice
                    ? stateLocal.posts_slice.map(post =>
                      <RenderPosts key={post.pid} post={post} />
                     )
                    : null
                }
            </div>
            <Dialog
              open={stateLocal.open}
              onClose={handleClickClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    >
                      Deleteing Post
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={() => DeletePost() }>
                        Agree
                      </Button>
                      <Button onClick={() => handleClickClose()}>
                        Cancel
                      </Button>
                  </DialogActions>
                </DialogContent>
            </Dialog>

          </div>
  )}



export default (Profile);