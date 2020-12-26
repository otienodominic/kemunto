import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import AuthState from './context/authContext/authState'
import PostState from './context/postContext/postState'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/Home/index'
// import UpdateFile from './components/Files/UpdateFile'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <PostState>
        <Router>
          <div>
            <Navbar />
            <Switch>
            <Home exact path='/' component={Home} />
            {/* <PrivateRoute exact path='/update/:id' component={UpdateFile}/> */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </PostState>
    </AuthState>
  );
}
export default App;