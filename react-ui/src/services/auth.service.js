 import axios from 'axios';

const register = (username, email, password) => {
  return axios.post('/api/posts/userprofiletodb', {
    username,
    email,
    password,
  });
    // return fetch('/api/posts/userprofiletodb',{
    //     method:'post',
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //         username,
    //         password,
    //         email,
        
    //     })
    // })

};
const login = (email, password) => {
    axios.post('/api/get/userprofilefromdb',{
            password,
            email
        }) 
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};