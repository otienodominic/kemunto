import React, { useEffect, useReducer, useContext } from "react";
import history from './utils/history'
import Context from './utils/context';
import {Route, Link, BrowserRouter } from "react-router-dom";
import {Switch} from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


// Reducers
import {AuthReducer, initialState}  from './store/reducers/auth_reducer';

// Components
import Header from "./components/Header"
import Profile from './components/Profile'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import CreatePost from './components/CreatePost'
import Home from './components/Home'
import Posts from './components/Posts'

// Context
 //export const userContext = createContext()


const Routing =()=>{

  const {state, dispatch} = useContext(Context)
  useEffect(()=> {
    //const user = context.data[0].uid
  const user = JSON.parse(JSON.stringify(localStorage.getItem('user')))
    if(user){
      dispatch({type:'USER', payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/')
    }
  },[])

  return(
   <div>
     <Header />
     <div>
      <Switch>
        <Route exact path='/signin' component={SignIn}>
          <SignIn />
        </Route>
        <Route exact path='/signup' component={SignUp}>
          <SignUp />
        </Route>
        <Route exact path='/profile' component={Profile}>
          <Profile />
        </Route>
        <Route exact path='/create_post' component={CreatePost}>
          <CreatePost />
        </Route>
        <Route exact path='/' component={Home}>
          <Home /> 
        </Route>
        <Route exact path='/posts' component={Posts}>
          <Posts />
        </Route>

      </Switch> 
     </div>
   </div>
 )
}



const App = () => {  
  const [state, dispatch]= useReducer(AuthReducer, initialState)
  return(
    <div>
    <Context.Provider value={{state, dispatch}}>  
      <BrowserRouter>
        <Routing /> 
      </BrowserRouter>      
    </Context.Provider>
  </div>
  )
};

export default App;