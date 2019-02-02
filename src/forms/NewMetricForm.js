import React, { Component } from 'react';

class newMetricForm extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: '',
      time: true,
      higher_is_better: false,
      goal: '',
      errors: {}
    }
  }

  componentDidMount(){
    if(this.props.metric){
      this.setState({
        ...this.props.metric, errors: {}
      })
    }
  }

  validate(){
    let errors = {};
    if(!this.state.name){
      errors.name = 'Please enter a Name'
    }
    if(!this.state.unit && !this.state.time){
      errors.unit = 'Please enter a Unit of measure - kg, lbs eg'
    }
    if(errors.name || errors.unit){
      console.log(errors)
      this.setState({errors})
      return;
    }
    this.props.submitForm(this.state)
    this.setState({
      name: '',
      unit: '',
      time: true,
      higher_is_better: false,
      goal: '',
      errors: {}
    })
  }


  textInput(label, property, placeholder = null){
    return (
      <div>
        <label>{label}</label>
        <input type='text' 
          value={this.state[property]} 
          onChange={e => {this.setState({[property]: e.target.value}) }}
          placeholder={placeholder}
        ></input>
        {
          this.state.errors[property] &&
          <p>{this.state.errors[property]}</p>
        }

      </div>
    )
  }

  checkbox(label, property){
    return (
      <div>
        <label>{label}</label>
        <input type='checkbox' 
          checked={this.state[property]} 
          onChange={e => {this.setState({[property]: e.target.checked}) } }
        ></input>
      </div>
    )
  }
  

  render() {
    const state = this.state;
    return (
      <div>
        {this.textInput('Name', 'name', '5km Run')}
        {!this.props.edditing ? this.checkbox('Time', 'time') : ''}
        {!this.state.time ? this.textInput('Unit', 'unit', 'kg') : ''}
        {this.checkbox('Is Higher better?', 'higher_is_better')}
        <button onClick={() => this.validate()}>Submit</button>
      </div>
    )
  }

}


export default newMetricForm