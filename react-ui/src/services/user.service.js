import axios from "axios";
 import authHeader from "./auth.header";
 import authService from './auth.service'
 const {getCurrentUser} = authService
/*
    POSTS ROUTES SECTION
*/
  
  const getAllPosts =()=> {
    return axios
    .get('/api/get/allposts')
    .then((response) => {    

      return response.data
      // .sort((a, b) => parseFloat(b.pid) - parseFloat(a.pid));
    });
  }

  const getOnePost =(pid)=> {
    return axios
    .get('/api/get/post',{pid})
    .then((response) => { 
      return response.data      
    });
  }


  const getMyPosts = () => {
    const current_user = getCurrentUser()
    const author = current_user.username
    return axios
    .get('/api/get/user_posts', {headers: authHeader(), author})
    .then((response) => {
      return response.data
    })
  }

  const createPost = (title, body) => {
    const current_user = getCurrentUser()
    const user_id = current_user.id
    const author = current_user.username

    return axios.post('/api/post/posttodb', { headers: authHeader(),
      title,
      body,
      user_id,
      author,
    
    });      
  
  };

  
  
  const editPost = (title, body) => {
    const current_user = getCurrentUser()
    const user_id = current_user.id
    const author = current_user.username
    const post = getOnePost()
    const {pid} = post 
    return axios.post('/api/put/post', { 
      pid,
      title,
      body,
      user_id,
      author,    
    });     
  
  };

  
/*
  USER PROFILE SECTION
*/

export default {
  getAllPosts, createPost, getMyPosts, getOnePost, editPost
}





