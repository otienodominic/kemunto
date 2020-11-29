import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {Context} from '../../utils/context';
import history from '../../utils/history';
import M from 'materialize-css'
const NavBar = ()=>{
    const [ shouldOpenMenu, setOpenMenu ] = useState(false);
    const [ menuAnchor, setMenuAnchor ] = useState(null);
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
    const {userData, setUserData} = useContext(Context)

    const username = userData.username
     
    const closeMenu = () => {
        setOpenMenu(false);
      }
    
      const openMenu = (e) => {
        setOpenMenu(true);
        setMenuAnchor(e.currentTarget);
      }
    
      const logout = () => {
        setUserData();        
        closeMenu();
      }


     
    return(
        <AppBar position="static">
      {username ? 
      <Menu 
        id="menu" 
        anchorEl={menuAnchor} 
        keepMounted 
        open={shouldOpenMenu} 
        onClose={() => closeMenu()}>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/posts" style={{textDecoration: 'none', color: '#000'}}>Posts</Link>
          </MenuItem>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/addpost" style={{textDecoration: 'none', color: '#000'}}>Create Post</Link>
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <Link to="/" style={{textDecoration: 'none', color: '#000'}}>Logout</Link>
          </MenuItem>
        </Menu> : null}
        <Toolbar>
          {username ? <IconButton edge="start" color='inherit' onClick={e => openMenu(e)}>
            <MoreVert />
          </IconButton> : null}
          <Typography variant="h6">
            Health check App
          </Typography>
        </Toolbar>
    </AppBar>
    )
}


export default NavBar