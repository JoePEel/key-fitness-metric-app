import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewResultForm from '../forms/NewResultForm'
import {deleteResult, updateResult} from '../store/actions/metrics'
import moment from 'moment'

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

transformDate(date){
    return moment(date).format("Do MMM YYYY, h:mma"); 
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


render(){
    const {result, metric, deleteResult} = this.props
    return (
        <div className="bg-grey-lighter my-3 p-2 rounded shadow relative">
            <div>
                {this.state.edditing ? 
                    <div className="py-4">
                        <NewResultForm
                            submitForm={this.handleSubmitForm.bind(this)} 
                            result={result} 
                            metric={metric}
                        />
                        <button
                            className="absolute pin-t pin-l text-sm mt-1 mr-1 md:mt-2 md:mr-2 hover:underline text-red focus:outline-none"
                            onClick={() => this.props.deleteResult(metric.id, result.id)}
                        >
                            Delete
                        </button>
                    </div>
                    : 
                    <div className="flex flex-row max-w-xs justify-between items-center mx-auto">
                        <h2>{this.getDisplayValue()}</h2>
                        <p>{this.transformDate(this.props.result.date)}</p>
                    </div>
                }
            </div>
            <button
                className="absolute pin-t pin-r text-sm mt-1 mr-1 md:mt-2 md:mr-2 hover:underline text-grey-darker focus:outline-none"
                onClick={() => this.setState({edditing: !this.state.edditing})}
            >
                {!this.state.edditing ? 'Edit' : 'Cancel' }
            </button>
        </div>
    )
}
    
}


  const mapDispatchToProps = {
    deleteResult,
    updateResult
  };
  
  export default connect(null, mapDispatchToProps)(Result);