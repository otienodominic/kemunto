import React from 'react';
import PostState from './context/postContext/PostState'
import Navigation from './components/Navigation'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// import Algos from './pages/algos'
// import Cloud from './pages/cloud'
// import Health from './pages/health'
import Home from './pages/Home'
import Post from './pages/Post'
// import Post from './pages/post'
// import WebDev from './pages/web-dev'
// import EditPost from './pages/edit-post'

function App() {
  return (
    <PostState>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>

            {/* <Route path='/algos' component={Algos} /> */}
            {/* <Route path='/cloud' component={Cloud} /> */}
            {/* <Route path='/health' component={Health} /> */}
            {/* <Route path='/login' component={Login} /> */}
            <Route path='/post' component={Post} />
            {/* <Route path="/web-dev" component={WebDev} /> */}
            {/* <Route path="/edit-post" component={EditPost} /> */}
            <Route exact path='/' component={Home} />
            <Route component={() => 404} />
          </Switch>
        </div>
      </Router>
    </PostState>
  );
}

export default App;