import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewResultForm from '../forms/NewResultForm'
import {deleteResult, updateResult} from '../store/actions/metrics'

class Result extends Component {

constructor(props) {
  super(props);
  this.state = {
      edditing: false
  }
}

handleSubmitForm(formData){
    this.props.updateResult(this.props.metric.id, {...formData, id: this.props.result.id})
    this.setState({
        edditing: false
    })
}

getDisplayValue(){
    const result = this.props.result
    const metric = this.props.metric
    if(metric.time){
        const minutes = Math.floor(result.value / 60);
        const seconds = result.value - (minutes * 60)
        return `${minutes}:${seconds}`
    }
    return `${result.value}${metric.unit}`
}

componentDidMount(){
    console.log(this.props.result)
}

render(){
    const {result, metric, deleteResult} = this.props
    return (
        <div>
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

    }
  }

  const mapDispatchToProps = {
    deleteResult,
    updateResult
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Result);