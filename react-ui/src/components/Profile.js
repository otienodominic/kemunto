import React, {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service'
import TextField from '@material-ui/core/TextField'
// import Form from '@material-ui/core/form'

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
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
      <div><p>Title:</p>
        <TextField 
        variant='outlined'
        color= 'secodary'
        />
      </div>
      <div><p>Body:</p>
        <TextField 
        variant='outlined'
        
        />
      </div>
      

      <strong>Posts:</strong>
            <div>
      {
        posts.map((post, key) => {
            return (
            <>
            <div key={key}>{post.title}</div>
            <div key={key}>{post.body}</div>
            <strong>Date Posted</strong>
            <div key={key}>{post.date_created}</div>              
            </>)
        })
      }
      
      </div>
    </div>
  );
};

export default Profile;