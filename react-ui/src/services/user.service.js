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
  


  
/*
  USER PROFILE SECTION
*/

export default {
  getAllPosts, createPost
}





