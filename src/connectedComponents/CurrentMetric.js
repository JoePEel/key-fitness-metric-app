import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewResultForm from '../forms/NewResultForm'
import NewMetricForm from '../forms/NewMetricForm'
import {addResult, deleteResult, updateMetric} from '../store/actions/metrics'
import Result from './Result'
import ResultSorter from './ResultSorter'



class CurrentMetric extends Component {

constructor(props) {
  super(props);
  this.state = {
      edditing: false
  }
}

handleSubmitFormNew(formData){
    this.props.addResult(this.props.metric.id, formData)
    console.log(formData)
}

handleSubmitFormUpdate(formData){
    this.props.updateMetric(this.props.metric.id, formData)
    this.setState({
        edditing: false
    })
}

renderResults(){
    if(this.props.results.length > 0){
        return this.props.results.map(result => {
            return (
                <Result key={result.id} result={result} metric={this.props.metric} />
            )
        })
    }
}

render(){
    const{metric} = this.props
    if(metric){
        return (
            <div>
                <h2>{metric.name}</h2>
                <button onClick={() => this.setState({edditing: !this.state.edditing})}>
                    {!this.state.edditing ? 'Edit' : 'Back' }
                </button>
                {this.state.edditing ? 
                    <NewMetricForm 
                        submitForm={this.handleSubmitFormUpdate.bind(this)} 
                        edditing={true} 
                        metric={metric}
                    />  
                        : ''
                }
                <NewResultForm metric={metric} submitForm={this.handleSubmitFormNew.bind(this)} />
                <ResultSorter></ResultSorter>
                <ul>
                    {this.renderResults()}
                </ul>
            </div>
        )
    }
    return (
        <h1>No data found</h1>
    )

}
    
}

const mapStateToProps = function(state) {
    return {
      metric: state.metrics.selectedMetric.metric,
      results: state.metrics.selectedMetric.results
    }
  }

  const mapDispatchToProps = {
    addResult,
    deleteResult,
    updateMetric
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CurrentMetric);
  