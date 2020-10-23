import authHeader from "./auth-header";
/*
    POSTS ROUTES SECTION
*/




/*
  USER PROFILE SECTION
*/

const registerUser = () =>{
    return fetch('/api/get/allposts', {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': authHeader(),            
            'Content-Type': 'application/json'
        }
    })
}



//router.post('/api/posts/userprofiletodb',registerUser)  
//router.post('/api/get/userprofilefromdb', loginUser )
