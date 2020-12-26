import React, {useContext, useEffect} from 'react'
import { Grid, Container, Typography } from '@material-ui/core';
import PostContext from '../../context/postContext/postContext'
import AuthContext from '../../context/authContext/authContext'

import PostItem from './PostItem'
const postsAreaStyle = {
    paddingTop: '2rem',
    paddingBottom: '2rem',
};

export default function PostList() {
    const {posts, postFilter, search_Post, getPosts} = useContext(PostContext)
    const {loading} = useContext(AuthContext)
    useEffect(() => {
        getPosts();        
      }, []);
      console.log(posts)
      if (posts === null || posts.length === 0) {
        return <h3 className="no-guest">{loading ? 'Loading guests...' : 'Please add a guest'}</h3>
      }
    
    return (
        <div>
             <Container style={postsAreaStyle} maxWidth="md">
                <Typography variant="h4" component="h2">
                Blog Posts
                </Typography>
                <Grid container spacing={1}>
                {
                    posts.map( p => <PostItem key={p.pid} post={p} />)
                    
                    }
                </Grid>
                </Container>
        </div>
    )
}
