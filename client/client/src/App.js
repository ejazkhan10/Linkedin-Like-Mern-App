import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, LogOutUser } from "./actions/authActions";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

import store from "./store";
import { clearProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create_profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/profile/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//Check for Token

if (localStorage.jwtToken) {
  // Set auth token auth

  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration

  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for Expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(LogOutUser());
    //TODO: Clear Current Profile
    store.dispatch(clearProfile());
    //TODO: Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
