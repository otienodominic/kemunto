 import axios from 'axios';

//const API_URL = "http://localhost:5000/api/auth/";

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
    fetch('/api/get/userprofilefromdb',{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password,
            email
        })
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