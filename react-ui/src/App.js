import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {Context} from "./utils/context";
import history from './utils/history'

import Login from './components/auth/Login'
import PrivateRoute from './components/auth/PrivateRoute'
import Register from './components/auth/Register'
import Posts from './components/Blog/posts'
import ShowPost from './components/Blog/showpost'
import EditPost from './components/Blog/editpost'
import AddPost from './components/Blog/addpost'
import ShowUser from './components/profile/showuser'

import Profile from './components/profile/Profile'
import SendMessage from './components/profile/sendmessage'
import ShowMessages from './components/profile/showmessage'
import ReplytoMessage from './components/profile/replytomessage'
import Header from './components/profile/header'





import Home from './components/home'

export default function App() { 
  const existingUser = localStorage.getItem("user") || "";  
  const [userData, setUserData] = useState(existingUser);

  const setUser =(data) => {
    if(!data){
      localStorage.removeItem('user');
      setUserData();
    }else{
      localStorage.setItem('user', data)
      setUserData(data)
    }
  }  

  return (
    <>
      <BrowserRouter history={history}>
        <Context.Provider value={{ userData, setUserData: setUser }}>
        <Header />
          <div className="container">
            <Switch>
              <Route exact path="/"  component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />             
              <Route path="/posts" component={Posts} />
              <Route path='/post/:pid' component={ShowPost} />
              <Route path='/editpost/:pid' component={EditPost} />
              <Route path='/addpost' component={AddPost} />
              <Route path="/user/:name" component={ ShowUser } />
              {/* <PrivateRoute exact path="/home" component={HomePage} /> */}
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/sendmessage" component={SendMessage} />
              <PrivateRoute exact path="/showmessages/:id" component={ShowMessages} />
              <PrivateRoute exact path="/replytomessage" component={ReplytoMessage} />
              {/* <PrivateRoute exact path="/privateroute" component={PrivateComponent} /> */}
              
            </Switch>
          </div>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

