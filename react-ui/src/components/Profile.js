import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service'
const {getCurrentUser} = AuthService
const {getAllPosts} = UserService

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
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Posts:</strong>
            <div>
      {
        posts.map((post, key) => {
            return (
            <>
            <div key={key}>{post.title}</div>
            <div key={key}>{post.body}</div>
            <strong>Date Posted</strong>
            <div key={key}>{post.date_created.getFullYear()}</div>              
            </>)
        })
      }
      
      </div>
    </div>
  );
};

export default Profile;