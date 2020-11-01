import React, {useState, useEffect, useRef} from "react";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Form from "react-validation/build/form";
import Button from '@material-ui/core/Button'
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Textarea from 'react-validation/build/textarea'

import '../App.css'





//import Form from '@material-ui/core/form'
// import Form from '@material-ui/core/form'

const {getCurrentUser} = AuthService
const {getAllPosts, getMyPosts} = UserService


const Profile = () => {
  
  const [posts, setPosts] = useState([])
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const fetchPosts = async () => {
        const posts = await getAllPosts()
        console.log(posts)
        setPosts(posts)
    };    
    fetchPosts()
}, []);

    
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>     
     
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
           

      <strong>Posts:</strong>
            <div>
      {
        posts.map((post, key) => {
            return (
            <>
            <div className="list">
            <div key={key}>{post.author}</div>
            <div key={key}>{post.title}</div>
            <div key={key}>{post.body}</div>           
            <strong>Date Posted</strong>
            <div key={key}>{post.date_created}</div> 
            </div>             
            </>)
        })
      }
      
      </div>
    </div>
  );
};

export default Profile;