import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import CurrentMetric from '../connectedComponents/CurrentMetric'
import NewMetric from '../connectedComponents/NewMetric'
import {getSingleMetric} from '../store/actions/metrics'
import {logout} from '../store/actions/auth'
import TopBar from '../general/TopBar'


class Home extends Component {

constructor(props) {
  super(props);
}

componentDidMount(){
  if(this.props.metrics){
    console.log(this.props.metrics, 'home')
  }
}

handleLogout= () => {
  this.props.logout()
}

renderMetricsNav() {
  let metrics = this.props.metrics;
  if(metrics){
    return this.props.metrics.map(metric => {
      return (
        <li className="my-2" key={metric.id}>
          <NavLink 
          className="ml-4 py-1 px-2 rounded no-underline text-black bg-grey-lighter" 
            activeStyle={activeLinkStyle} 
            to={`/home/metric/${metric.id}`} 
            onClick={() => this.props.getSingleMetric(metric.id)}
          >
            {metric.name}
          </NavLink>
        </li>
      )
    })
  }
  return;
}
render(){
    return (
      <div className="bg-blue-light min-h-full pb-16" style={{minHeight: '100vh'}}>
        <TopBar logout={this.handleLogout}/>
        <div className="container mx-auto">
          <Router>
            <div>
              <ul className="bg-white my-4 rounded p-2 flex flex-row flex-wrap list-reset">
                <li className="my-2">
                  <NavLink 
                    className="ml-4 py-1 px-2 font-bold rounded no-underline text-black bg-grey-lighter" 
                    activeStyle={activeLinkStyle} to="/home/new">New</NavLink>
                </li>
                {this.renderMetricsNav()}
              </ul>
              <div>
                <Route exact path="/home/metric/:id" component={CurrentMetric} />
                <Route exact path="/home/new" component={NewMetric} />
              </div>
            </div>
          </Router>
        </div>
      </div>
    )
}
    
}

const mapStateToProps = function(state) {
  return {
      metrics: state.metrics.all
  }
}

const mapDispatchToProps = {
  getSingleMetric,
  logout
  //cehck auth
};

const activeLinkStyle = {
  backgroundColor: '#36a8f9',
  color: 'white',
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
  