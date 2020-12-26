import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Card, CardContent, CardHeader, Typography, Grid, Link} from '@material-ui/core'
import moment from 'moment'
import PostContext from '../../context/postContext/postContext'
import '../../styles/pagination.css'

// import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './PostItem';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PostList from './PostList'


import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const mainFeaturedPost = {
  title: 'Epilepsy Quotes',
  description:
    "“There's nothing more debilitating about a disability than the way people treat you over it.” -Solange nicole ",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Invisible fist of Power',
    date: 'Nov 12',
    description:
      '“Electricity is life but electricity is an invisible fist punching up your spine, knocking your brains right out of your skull.” ― Ray Robinson',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Chariot of Hope',
    date: 'Nov 11',
    description:
      '“The light of Selene\'s chariot will appear before you and serve as your path” ― Tracey Morait, Episode',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];



const sidebar = {
  title: 'Quotable Quotes',
  description:
    '“The human brain is the universe\'s most implausible science experiment.” ― Will Boast, Daphne',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },    
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
 const {posts, getPosts} = useContext(PostContext)
  const classes = useStyles();

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


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">        
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <PostList  />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}