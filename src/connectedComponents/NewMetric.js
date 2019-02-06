import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewMetricForm from '../forms/NewMetricForm'
import {addMetric} from '../store/actions/metrics'

class NewMetric extends Component {

    constructor(props) {
    super(props);
    }

    handleSubmitForm(formData){
        this.props.addMetric(formData)
        console.log(formData)
    }

    render(){
        return (
            <div className="bg-white p-4 rounded">
                <h3 className="text-left">New</h3>
                <NewMetricForm submitForm={this.handleSubmitForm.bind(this)} edditing={false} />
            </div>
        )
    }
        
    }

    const mapStateToProps = function(state) {
        return {
        metrics: state.metrics
        }
    }

    const mapDispatchToProps = {
        addMetric
    };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NewMetric);