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
  return axios
    .post('/api/get/userprofilefromdb', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
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