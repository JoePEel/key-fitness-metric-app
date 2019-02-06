import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sortResult} from '../store/actions/metrics'

class Result extends Component {

constructor(props) {
  super(props);
  this.state = {
      active: '',
      order: 'desc'
  }
}

sortBy(type){
    this.props.sortResult(type, this.state.order)
    const newOrder = this.state.order == 'desc' ? 'asc' : 'desc'
    this.setState({
        active: type,
        order: newOrder
    })
}

getClasses = (type) =>{
    const active = this.state.active
    const styles = active == type ? "bg-green text-white" : "bg-white text-black";
    return `${styles} rounded m-4 shadow py-2 px-4 focus:outline-none`
}


render(){
    return (
        <div>
            <button
                className={this.getClasses('date')}
                onClick={() => this.sortBy('date')}
            >
                Date
            </button>
            <button
                className={this.getClasses('value')}
                onClick={() => this.sortBy('value')}
            >
                Result
            </button>
        </div>
    )
}
    
}


  const mapDispatchToProps = {
    sortResult,
  };
  
  export default connect(null, mapDispatchToProps)(Result);