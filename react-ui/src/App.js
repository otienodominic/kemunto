import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {Context} from "./utils/context";

// import "./style.css";

// Components 
// import Header from './components/views/Header' 
// import Home from './components/views/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
// import Profile from './components/views/Profile'
import Dashboard from './components/dashboard/index'
import Home from './components/home'

export default function App() {
  const [userData, setUserData] = useState({ user: undefined,});

  useEffect(() => {
    const checkLoggedIn = async () => {
      let User = localStorage.getItem("user");
      console.log(User)
      if (!User) {
        localStorage.setItem("user", "");
        User = "";
      }else{
        setUserData(User);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{ userData, setUserData }}>
         
          <div className="container">
            <Switch>
              <Route exact path="/"  component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />              
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}
