import React, {useState, useEffect, useRef} from "react";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service'

import '../App.css'


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