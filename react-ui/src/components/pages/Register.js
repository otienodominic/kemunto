import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AuthContext from '../../context/authContext/authContext'
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://knh.or.ke/">
        Patient Appointment and File Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();
const  history = useHistory()
const { register, error, clearErrors, setError } = useContext(AuthContext)
// useEffect(() => {
//     if (isAuthencated) {
//       props.history.push('/')
//     }
//   }, [isAuthencated, props.history])
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: ''
  })
  // Handle local errors
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

//   const { name, email, password, passwordCheck } = user
  const onChangeName = (e) => {
    const username = e.target.value;
    setName(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangePasswordCheck = (e) => {
    const passwordCheck = e.target.value;
    setPasswordCheck(passwordCheck);
  };
  const onsubmit = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios.post("/api/register", {name, email,password, passwordCheck})
     .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          history.push('/login')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.msg ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );   
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Register
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Full Name"
                autoFocus
                value={name} 
                onChange={onChangeName}
            
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email} 
                onChange={onChangeEmail}
              />
            </Grid>           
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} 
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="Re-type Password"
                type="password"
                id="passwordCheck"
                autoComplete="current-password2"
                value={passwordCheck} 
                onChange={onChangePasswordCheck}
              />
            </Grid>            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
        <div>
        {error && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}