import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
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
    const auth = this.props.auth
    return (
      <div className="App font-sans leading-normal min-h-full">
        <Router>
          <div>
          <Route path="/" render={() => (
              auth.checkedAuth && auth.user ? (
                <Redirect to="/home/new"/>
              ) : (
                <Login/>
              )
            )}/>
            <Route path="/home/new" render={() => (
              auth.checkedAuth && auth.user ? (
                <Home />
              ) : (
                <Redirect to="/"/>
              )
            )}/>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  checkAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
