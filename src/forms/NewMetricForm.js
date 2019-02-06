import React, { Component } from 'react';
import DeleteModal from '../general/DeleteModal'

class newMetricForm extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: '',
      time: true,
      higher_is_better: false,
      goal: '',
      errors: {},
      showDeleteModal: false
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
      errors: {},
      showDeleteModal: false
    })
  }


  textInput(label, property, placeholder = null){
    return (
      <div className="formGroup formGroup-grey">
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
      <div className="formGroup">
        <label className="mb-2">{label}</label>
        <input type='checkbox' 
          checked={this.state[property]} 
          onChange={e => {this.setState({[property]: e.target.checked}) } }
        ></input>
      </div>
    )
  }

  toggleDeleteModal = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showDeleteModal: !prevState.showDeleteModal
      }
    })
  }
  

  render() {
    const state = this.state;
    const {edditing, actionDelete} = this.props
    return (
      <div className="flex flex-col items-center relative">
          <div className="flex flex-col md:flex-row">
            {this.textInput('Name', 'name', '5km Run')}
            {!edditing ? this.checkbox('Time', 'time') : ''}
            {!this.state.time ? this.textInput('Unit', 'unit', 'kg') : ''}
            {this.checkbox('Is Higher better?', 'higher_is_better')}
          </div>
          {!state.showDeleteModal &&
          <div className="flex flex-row items-center">
            {edditing && <button 
              className="text-red mr-6 hover:underline cursor-pointer focus:outline-none"
              onClick={this.toggleDeleteModal}
            >
              Delete
            </button>}
            <button 
              className="text-green hover:underline my-8 cursor-pointer focus:outline-none"
              onClick={() => this.validate()}
            >
              Submit
            </button>
          </div>}
          {this.state.showDeleteModal &&
            <DeleteModal
              cancel={this.toggleDeleteModal}
              delete={actionDelete}
              name={this.state.name} />
          }
      </div>

    )
  }

}


export default newMetricForm