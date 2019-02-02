import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import { connect } from 'react-redux';
import {checkAuth} from './store/actions/auth'


class App extends Component {

  constructor(props) {
    super(props);
  }
  

  componentDidMount(){
    this.props.checkAuth()
  }



  render() {
    return (
      <div className="App">
      
        {/* For testing */}
        {/* <button onClick={() => this.getUser()}>Get User </button>
        <h1>{this.props.user.email}</h1> */}

        {/* Top bar component.
        If auth, give otion to logout */}
        
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
          </div>
        </Router>
       

      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = {
  checkAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
