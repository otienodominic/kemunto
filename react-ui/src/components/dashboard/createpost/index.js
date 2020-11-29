import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import InputLabel from '@material-ui/core/InputLabel';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
// import FilledInput from '@material-ui/core/FilledInput';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import InputAdornment from '@material-ui/core/InputAdornment'

import Editor from './NoteApp'

import history from '../../../utils/history'
import {Context} from '../../../utils/context'
import axios from 'axios';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {
  const { classes } = props;
  const {userData, setUserData} = useContext(Context)
  const [values, setValues] = useState({title: '', body: ''})

  const handleSubmit = (event) => {
    event.preventDefault()
    const user_id = userData.id
    const username = userData.username
    const data = {title: event.target.title.value,
                  body: event.target.body.value,
                  username: username,
                  uid: user_id}

    axios.post('/api/post/posttodb', data)
      .then(response => console.log(response))
      .catch((err) => console.log(err))
      .then(setTimeout(() => history.replace('/'), 700) )
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div>
    <Paper className={classes.paper}>
      < Editor />
    </Paper>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);