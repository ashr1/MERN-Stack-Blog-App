import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import SignUp from './pages/SignUp';
import NavigationBar from './components/NavigationBar';
import Auth from './pages/Auth';
import Logout from './pages/Logout';
import { getCurrentUser } from './api/Auth';

class App extends Component {

  state = {
    user: undefined
  };

  componentDidMount = () => {
    this.authUser();
  }
  
  authUser = async () => {
    const user = await getCurrentUser();
    /*
      data:
      _id: "5e61742bc8e3e75eb4fe2795"
      username: "aedlin6"
      email: "klangstrath6@nbcnews.com"
      role: "user"
    */
   if(user && user.data && user.data._id) {
     this.setState({
       user: user.data
     });
   }
  }

  logout = () => {
    this.setState({
      user: undefined
    })
  }

  render() {
    const isLoggedIn = this.state.user ? true : false;

    return (
      <Router>
        <div className="App">

          <h1 style={{textAlign: 'center'}}>My Blog</h1>
          <NavigationBar isLoggedIn={isLoggedIn} isAdmin={isLoggedIn && this.state.user.role==='admin'} />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route 
              path="/post/:id" 
              exact 
              render={ViewPost(isLoggedIn && this.state.user.role==='admin',this.state.user ?  this.state.user._id : null)}
            />
            <Route path="/auth/:token" exact component={Auth(this.authUser)} />
            {
              isLoggedIn && this.state.user.role === 'admin' &&
              <Route path="/edit/post/:id" exact component={EditPost} /> 
            }
            {
              isLoggedIn && this.state.user.role === 'admin' &&
              <Route path="/create" exact component={CreatePost} />
            }
            {
              isLoggedIn && <Route path="/logout" exact component={Logout(this.logout)} />
            }
            
            <Route path="/login" exact component={SignUp} />           
            
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}


export default App;