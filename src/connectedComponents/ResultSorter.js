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


render(){
    return (
        <div>
            <button onClick={() => this.sortBy('date')}>Date</button>
            <button onClick={() => this.sortBy('value')}>Value</button>
        </div>
    )
}
    
}

const mapStateToProps = function(state) {
    return {

    }
  }

  const mapDispatchToProps = {
    sortResult,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Result);