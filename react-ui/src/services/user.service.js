import axios from "axios";
// import authHeader from "./auth.header";
/*
    POSTS ROUTES SECTION
*/


export const getAllPosts = async() => {
    const posts = await axios.get("/api/get/allposts").catch((e) =>{
      console.error(e)
    })
    return posts
  };


/*
  USER PROFILE SECTION
*/





