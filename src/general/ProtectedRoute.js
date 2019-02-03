import React, { Component } from 'react';
import { connect } from 'react-redux';
import {checkAuth} from '../store/actions/auth'
import Home from '../pages/home'

class Result extends Component {

constructor(props) {
  super(props);

}

componentDidMount(){
    this.props.checkAuth()
}

render(){
    const {result, metric, deleteResult} = this.props
    return (
        <div className="bg-red">
            {this.state.edditing ? 
                <div>
                    <NewResultForm submitForm={this.handleSubmitForm.bind(this)} result={result} metric={metric}/>
                    <button onClick={() => this.props.deleteResult(metric.id, result.id)}>Delete</button>
                </div>
                : 
                <h1>{this.getDisplayValue()}</h1>
            }
            <button onClick={() => this.setState({edditing: !this.state.edditing})}>
                {!this.state.edditing ? 'Edit' : 'Back' }
            </button>
        </div>
    )
}
    
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    }
  }

  const mapDispatchToProps = {
    checkAuth
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Result);