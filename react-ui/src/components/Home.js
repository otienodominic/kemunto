import {data, contactItems, blogPosts} from '../services/data'
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';

import {getAllPosts} from "../services/user.service";


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
  const [contents, setContents] = useState([]);
  const {skills, firstName, headline, profilePic} = data
  const profilepic= "images/" + profilePic;
  const classes = useStyles();

  useEffect(() => {
    const fetchPosts = async () => {
        const contents = await getAllPosts()
        setContents( contents )        
    };    
    fetchPosts()
}, []);
 

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
              <h1>Journeying with Epilepsy for brains living with epilepsy</h1>
Living with <strong>epilepsy</strong> taught me the significance of taking care of the brain with or without epilepsy. 
<br/>
After many years of working as a general nursing practitioner, I felt passion for training as a nephrology nurse which from 2006 while living with Epilepsy.
<br/>
In the process of practising as nephrology/dialysis nurse, self-experience of living with epilepsy and compounded with observing patients convulsing while on dialysis and having suffered several convulsions during my practise as a nephrology nurse, for self-care and care of other persons living with epilepsy, I was triggered to switch to learning more about epilepsy and the brain.
This led to currying studies on: 
<br/>
<ol>
  <li>EEG in diagnosis and management of Epilepsy</li>
  <li>Psychiatric aspect of Epilepsy</li>
  <li>Sleep disorders associated with Epilepsy</li>
  <li>Counselling Psychology</li>
</ol>

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