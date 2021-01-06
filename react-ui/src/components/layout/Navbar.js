import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../../context/authContext/authContext'

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

const public_sections = [
  { title: 'Home', url: '/home' },
  { title: 'News', url: '#' },
  { title: 'events', url: '#' },
  { title: 'Contact Us', url: '#' },   
];

const private_sections = [
  { title: 'Home', url: '/' },
  { title: 'Create Post', url: '/create' },
  { title: 'Messages', url: '#' },
  { title: 'Profile', url: '#' },
  { title: 'Users', url: '#' },
 
];

const Navbar = (props) => {
  const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)
//   const { clearGuests } = useContext(GuestContext)
  const history = useHistory()
  const classes = useStyles();
  const { title } = props;

  const onLogout = () => {
    logout()    
    clearErrors()
  }
  const onRegister = () => history.push('/login')
  const authLinks = (
    <Fragment>
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
        <Button variant="outlined" size="small" onClick={onLogout}>
          Log Out
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {private_sections.map((private_section) => (
          <Link
            color="inherit"
            noWrap
            key={private_section.title}
            variant="body2"
            href={private_section.url}
            className={classes.toolbarLink}
          >
            {private_section.title}
          </Link>
        ))}
      </Toolbar>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
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
        <Button variant="outlined" size="small" onClick={onRegister}>
          Login
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {public_sections.map((public_section) => (
          <Link
            color="inherit"
            noWrap
            key={public_section.title}
            variant="body2"
            href={public_section.url}
            className={classes.toolbarLink}
          >
            {public_section.title}
          </Link>
        ))}
      </Toolbar>
    </Fragment>
  );

  return (
    <div >      
        {isAuthencated ? authLinks : guestLinks}     
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,  
}
Navbar.defaultProps = {
  title: 'Health Check App',
  
}

export default Navbar