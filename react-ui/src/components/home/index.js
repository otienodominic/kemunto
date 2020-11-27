import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Card, CardContent, CardHeader, Typography, Grid, Link} from '@material-ui/core'
import moment from 'moment'

import '../../styles/pagination.css'

import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';


import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '#' },
  { title: 'Gallery', url: '#' },
  { title: 'Contact Me', url: '#' },
  { title: 'My Story', url: '#' },
  
];

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
  const classes = useStyles();
  const [stateLocal, setState] = useState({ posts: [],
    fetched: false,
    first_page_load: false,
    pages_slice: [1, 2, 3, 4, 5],
    max_page: null,
    items_per_page: 3,

    currentPage: 1,
    num_posts: null,
    posts_slice: null,    
    posts_per_page: 3
})

useEffect(() => {
  const fetchPosts = async () => {
      const all_posts = await axios.get('/api/get/allposts')
      const posts = all_posts.data
      const indexOfLastPost = 1 * stateLocal.posts_per_page
      const indexOfFirstPost = indexOfLastPost - stateLocal.posts_per_page
      const last_page = Math.ceil(posts.length/stateLocal.posts_per_page)
      setState({...stateLocal,
          fetched: true,
          posts: [...posts],
          num_posts: posts.lengthh,
          max_page: last_page,
          posts_slice: posts.slice(indexOfFirstPost,
                                                indexOfLastPost)
          })
}            
  fetchPosts()
}, []); 
useEffect(() => {
  let page = stateLocal.currentPage
  let indexOfLastPost = page * 3;
  let indexOfFirstPost = indexOfLastPost - 3;

  setState({...stateLocal,
            posts_slice: stateLocal.posts.slice(indexOfFirstPost,
                                                indexOfLastPost) })
}, [stateLocal.currentPage])

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

const page_change = (page) => {
  window.scrollTo({top:0, left: 0, behavior: 'smooth'})

  //variables for page change
  let next_page = page + 1
  let prev_page = page - 1

  //handles general page change
  //if(state.max_page < 5 return null)
  if(page > 2 && page < stateLocal.max_page - 1) {
    setState({...stateLocal,
              currentPage: page,
              pages_slice: [prev_page - 1,
                            prev_page,
                            page,
                            next_page,
                            next_page + 1],
            })
   }
   if(page === 2 ) {
     setState({...stateLocal,
              currentPage: page,
               pages_slice: [prev_page,
                             page,
                             next_page,
                             next_page + 1,
                             next_page + 2],
             })
    }
   //handles use case for user to go back to first page from another page
   if(page === 1) {
     setState({...stateLocal,
              currentPage: page,
               pages_slice: [page,
                             next_page,
                             next_page + 1,
                             next_page + 2,
                             next_page + 3],
          })
   }
   //handles last page change
   if(page === stateLocal.max_page) {
     setState({...stateLocal,
               currentPage: page,
               pages_slice: [prev_page - 3,
                             prev_page - 2,
                             prev_page - 1,
                             prev_page,
                             page],
             })
   }
   if(page === stateLocal.max_page - 1) {
     setState({...stateLocal,
               currentPage: page,
               pages_slice: [prev_page - 2,
                             prev_page - 1,
                             prev_page,
                             page,
                             next_page],
             })
   }
 }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Health Check Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          {/* Begin 'about me' card */}
      <Grid item xs={12} >
        <Card className={classes.root}>
            <CardContent>
              <Typography variant="body2" gutterBottom>
              <h1>Posts</h1>
              {                
                stateLocal.posts_slice
                ? stateLocal.posts_slice.map(post =>
                  <RenderPosts key={post.pid} post={post} />
                 )
                : null        
      } 
      <div>
      <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          <div className="FlexRow">
              <button onClick={() => page_change(1) }> First </button>
              <button onClick={() => page_change(stateLocal.currentPage - 1) }> Prev </button>
                 {stateLocal.pages_slice.map((page) =>
                     <div
                       onClick={() => page_change(page)}
                       className={stateLocal.currentPage === page
                                     ? "pagination-active"
                                     : "pagination-item" }
                       key={page}>
                         {page}
                      </div>
                 )}
               <button onClick={() => page_change(stateLocal.currentPage + 1)}> Next </button>
               <button onClick={() => page_change(stateLocal.max_page)}> Last </button>
             </div>
       </div>     
      
      </Typography>
      
            </CardContent>
        </Card>
      </Grid> 
{/* End about me */}
        </main>
      </Container>
      <Footer title="Health Check App" description="Epilepsy is not rare!" />
    </React.Fragment>
  );
}