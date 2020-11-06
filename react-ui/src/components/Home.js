import {data, contactItems, blogPosts} from '../services/data'
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Card, CardContent, CardHeader, CardMedia, Typography, Grid, CardActions, Icon, Link} from '@material-ui/core'
import moment from 'moment'
import axios from 'axios'

import AuthService from "../services/auth.service";
import UserService from '../services/user.service'

import '../App.css'
import '../styles/pagination.css';

const {getCurrentUser} = AuthService

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  paper: {
    minHeight: "65px",
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  media: {
    width: "100%",
    minHeight: 250,
    minWidth: 250,
  },
  skills: {
    fontVariant: "all-small-caps",
    fontSize: "large",
    border: "thin",
    borderStyle: "dotted",
    borderRadius: "5px",
    margin: "5px 5px 5px 8px",
    padding: "5px",
    background: "#dbe9f1",
    fontWeight: "bold"
  },
  contact: {
    margin: "20px 10px 0px 0px",
  },
  items: {
    margin: "5px",
  },
  links: {
    color: "black",
    borderBottomStyle: "dotted",
    border: "thin",
  },
  header: {
    textAlign: "left",
    padding: "5%",
    margin: "1%"
  }
});

const Home = () => {
  const currentUser = getCurrentUser()
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

  const {skills, firstName, headline, profilePic} = data
  const {getAllPosts} = UserService
  const profilepic= "images/" + profilePic;
  const classes = useStyles();
  
  
  
  useEffect(() => {
    const fetchPosts = async () => {
        const posts = await getAllPosts()
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
    
    <Grid container spacing={5} className={classes.root}>
{/* Begin main/profile pic card */}
      <Grid item xs={12}>
        <Card>
          {/* Container within the card for flex grid */}
          <Grid container className={classes.root}>
            {/* Profile Picture */}
            <Grid item sm={3} className={classes.media}>
              <CardMedia
                className={classes.media}
                image={profilepic}
              />
            </Grid>
            {/* Main card title and text */}
            <Grid item sm={5}>
              <CardContent className={classes.header}>
                <Typography gutterBottom variant="h2" component="h2">
                  Hi, I'm {firstName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {headline}
                </Typography>
                
                {contactItems.map(item => <Button
                variant="contained"
                color="default"
                className={classes.contact}
                href={item.href}
                key={contactItems.indexOf(item)}
                aria-label={item.text}
              >
                <Icon className={item.icon}/>
              </Button>)}
                
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
{/* End main card */}

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
        // posts.map((post, key) => {
        //     return (
        //     <>
        //     <div key ={key}><i>Posted by: {post.author}</i></div>
        //     <h3><div key={key}>{post.title}</div></h3>
        //     <div key={key}>{post.body}</div>           
        //     <strong>Date Posted</strong> 
        //     <div key={key}>{moment(post.date_created).format('MMMM Do, YYYY | h:mm:s a')}</div>                        
        //     </>)
        // })
      } 
      <div>
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

{/* Begin skills card */}
      <Grid item >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Technical Skills
            </Typography>
            <CardActions className={classes.paper}>
              {skills.map(skill => <span key={skills.indexOf(skill)} className={classes.skills}><code>{skill}</code></span>)}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
{/* End skills */}
      <Grid item >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
            Blog Posts
            </Typography>
            <CardActions className={classes.paper}>
            {/* {contents && contents.map(item => 
              <Button 
                key={contents.indexOf(item)}
                className={classes.items} 
                // href={item.href}
                aria-label={item.title}
                variant="outlined"
              >
                  <strong>{item.title}</strong>
              </Button>
              )} */}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid> // End container
  
  );
};

export default Home;

