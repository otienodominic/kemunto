import axios from "axios";
// import authHeader from "./auth.header";
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
    return axios.post('/api/post/posttodb', {
      title,
      body,
    });      
  
  };
  

/*
  USER PROFILE SECTION
*/

export default {
  getAllPosts, createPost
}





