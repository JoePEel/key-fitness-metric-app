import React, { Component } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class newResultForm extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      seconds: 0,
      minutes: 0,
      errors: {},
      date: new Date
    }
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount(){
    const result = this.props.result
    if(result){
      console.log(result)
      const minutes = Math.floor(result.value / 60);
      const seconds = result.value - (minutes * 60)
      this.setState({
        value: result.value,
        minutes,
        seconds,
        errors: {},
        date: new Date(result.date)
      })
    }
  }

  handleChange(date) {
    this.setState({
      date
    });
  }

  validate(){
    const {time} = this.props.metric
    const {minutes, seconds, value} = this.state
    let errors = {};
    if(time && (!minutes || !seconds)){
      errors.minutes = 'Please input a time'
    }
    if(!time && !value){
      errors.value = 'Please enter a valid input'
    }
    if(errors.value || errors.name){
      this.setState({errors})
      return;
    }

    //Convert to seconds
    if(this.props.metric.time){
      this.setState(state => {
        return {value: (parseInt(state.minutes * 60)) + parseInt(state.seconds)}
      }, () => {
        this.props.submitForm(this.state)
      }
    )} else {
      this.props.submitForm(this.state)
    }
  }


  textInput(label, property){
    return (
      <div className="formGroup">
        <label>{label}</label>
        <input type='number' 
          value={this.state[property]} 
          onChange={e => {this.setState({[property]: e.target.value}) } }
        ></input>
        {
          this.state.errors[property] &&
          <p>{this.state.errors[property]}</p>
        }
      </div>
    )
  }

  render() {
    const metric = this.props.metric

    return (
      <div className="flex flex-col">
        <div className="flex md:flex-row flex-col justify-center">
          {this.textInput(metric.time ? 'Minutes' : metric.unit, metric.time ? 'minutes' : 'value')}
          {metric.time ? this.textInput('Seconds', 'seconds') : ''}
          <div className="formGroup">
            <label>Date</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
              
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
            />
          </div>
        </div>
        <button
          className="text-sm mt-4 hover:underline text-green focus:outline-none"
          onClick={() => this.validate()}
        >
          Submit
        </button>
      </div>
    )
  }

}


export default newResultForm