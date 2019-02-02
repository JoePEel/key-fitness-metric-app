import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import CurrentMetric from '../connectedComponents/CurrentMetric'
import NewMetric from '../connectedComponents/NewMetric'
import {getSingleMetric} from '../store/actions/metrics'

class Home extends Component {

constructor(props) {
  super(props);
}

componentDidMount(){
  if(this.props.metrics){
    console.log(this.props.metrics, 'home')
  }
 
}

renderMetricsNav() {
  let metrics = this.props.metrics;
  if(metrics){
    return this.props.metrics.map(metric => {
      return (
        <li key={metric.id}>
          <Link to={`/home/metric/${metric.id}`} onClick={() => this.props.getSingleMetric(metric.id)}>{metric.name}</Link>
        </li>
      )
    })
  }
  return;
}
render(){
    return (
      <div>
        <h1>Home</h1>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/home/new">New</Link>
              </li>
              {this.renderMetricsNav()}
            </ul>
            <Route exact path="/home/metric/:id" component={CurrentMetric} />
            <Route exact path="/home/new" component={NewMetric} />
          </div>
        </Router>


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
  getSingleMetric
  //cehck auth
};

  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  