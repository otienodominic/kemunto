import React, {useContext, useRef, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Context from '../utils/context'
import history from '../utils/history'
import M from 'materialize-css'


const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


const sections = [
    { title: 'Home', url: '/' },
    { title: 'Posts', url: '/posts' },
    { title: 'Create Post', url: '/create_post' },
    { title: 'Forum', url: '/forum' },
    { title: 'Gallery', url: '/gallery' },
    { title: 'Profile', url: '/profile' },
    
    
  ];
export default function Header(props) {
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const {state, dispatch} = useContext(Context)
  const classes = useStyles();
  const title  = 'Health Check App';

  useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])
  

const searchPosts =(search_query)=>{
    setSearch(search_query)
    fetch('/api/get/searchpost', {
        method:'post',
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
         search_query   
        })
    }).then((res)=>res.json())
        .then(results =>{
            setPosts(results.posts)
        })
}


  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {state? 
         <Button variant="outlined" size="small" onClick={()=>{
             localStorage.clear()
             dispatch({type: 'CLEAR'})
             history.push('/')
         }}>
          Logout
        </Button>:
        <Button variant="outlined" size="small"
       href='/signin'>
        Login
      </Button>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      {state &&
        sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
            
          ))          
      }
      </Toolbar>
    </React.Fragment>
  );
}

