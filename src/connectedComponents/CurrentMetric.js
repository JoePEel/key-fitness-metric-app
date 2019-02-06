import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewResultForm from '../forms/NewResultForm'
import NewMetricForm from '../forms/NewMetricForm'
import {addResult, deleteResult, updateMetric, deleteMetric} from '../store/actions/metrics'
import Result from './Result'
import ResultSorter from './ResultSorter'
import FlipMove from 'react-flip-move';
import BasicLineChart from '../general/BasicLineChart'
import ResultSummary from '../general/ResultSummary'


class CurrentMetric extends Component {

constructor(props) {
  super(props);
  this.state = {
      edditing: false
  }
}

componentWillUpdate(prevProps){
    console.log(prevProps)
    if(prevProps.metric && this.props.metric && prevProps.metric.id != this.props.metric.id){
        this.setState({
            edditing: false
        })
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

handleActionDelete = () => {
    this.props.deleteMetric(this.props.metric.id)
}

renderResults(){
    const {results, metric} = this.props
    if(results.length > 0){
        return (
            <FlipMove>
                {results.map(result => 
                    <Result key={result.id} result={result} metric={metric} />
                )}
            </FlipMove>
        )
    }
}

render(){
    const{metric, results} = this.props
    if(metric){
        return (
            <div className="relative">
                <div className="bg-white p-4 rounded relative">
                    <h2 className="text-left">{metric.name}</h2>
                    <ResultSummary
                        className="mt-3"
                        metric={metric}
                        results={results}
                    />
                    {results.length > 2 &&
                    <BasicLineChart
                        forTime={metric.time}
                        data={results}
                    ></BasicLineChart>}
                    <button
                        className="absolute pin-t pin-r mr-2 mt-2 text-sm hover:underline text-red-light focus:outline-none"  
                        onClick={() => this.setState({edditing: !this.state.edditing})}
                    >
                        {!this.state.edditing ? 'Edit' : 'Back' }
                    </button>
                    {this.state.edditing &&
                        <NewMetricForm 
                            submitForm={this.handleSubmitFormUpdate.bind(this)} 
                            edditing={true} 
                            metric={metric}
                            actionDelete={this.handleActionDelete}
                        />  
                    }
                </div>
                <div className="bg-white p-4 mt-4 rounded">
                    <h3 className="text-left">Add New </h3>
                    <NewResultForm metric={metric} submitForm={this.handleSubmitFormNew.bind(this)} />
                </div>
                {results.length ? 
                <div className="bg-white p-4 mt-4 rounded">
                    <h3 className="text-left">Results</h3>
                    <ResultSorter></ResultSorter>
                    <ul className="p-0">
                        {this.renderResults()}
                    </ul>
                </div> : ''}
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
    updateMetric,
    deleteMetric
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CurrentMetric);
  