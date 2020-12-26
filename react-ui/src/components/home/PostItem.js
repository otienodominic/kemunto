import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardContent,Typography,Grid,CardMedia,CardActions,Button, Divider} from '@material-ui/core';
import moment from 'moment'

import PostContext from '../../context/postContext/postContext'
import AuthContext from '../../context/authContext/authContext'


const itemStyles = {
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  };

export default function PostItem({ post }) {  
  const {removePost, edit_Post, clearEdit, update_Post} = useContext(PostContext)
  const {isAuthencated} = useContext(AuthContext)
  const {pid, title, body, author, likes, date_created} = post

  const handleRemove = () => {
    removePost(pid)
    clearEdit()
  }
  return (
    <Grid item  xs={12} sm={12} style={{margin:'1rem 0'}}>
      <Card style={itemStyles.card}>
        <CardContent style={itemStyles.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" align="justify" paragraph={true} >
          {body}
          </Typography>
          <Typography gutterBottom>
            Posted By: {author}
          </Typography>
          <Typography gutterBottom>
           Likes {likes}
          </Typography>
          <Typography gutterBottom>
            {moment(date_created).format('MMMM Do, YYYY | h:mm:s a')}
          </Typography>
        </CardContent>
        <CardActions>
          {isAuthencated ? (<Grid>
            <Grid>
              <Button size="small" color="primary" onClick={() => edit_Post(post)}>
                Edit Post
              </Button>
            </Grid>
            <Grid>
              <Button size="small" color="secondary" onClick={handleRemove}>
                Delete
              </Button>
            </Grid>
          </Grid>) : null
          }
        </CardActions>
      </Card>
    </Grid>
  );
}

PostItem.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};