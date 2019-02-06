import React, {Component} from 'react'

import  {LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment'

class BasicLineChart extends Component {

  constructor(props) {
    super(props);
  }

  formatData = () => {
    const {data, forTime} = this.props
    let newArray = data.map(item => {
      return {
        result: forTime ? Math.floor(item.value / 60) : item.value,
        date: moment(item.date).format("Do MMM YY")
      }
    })
    return newArray.reverse()
  }


	render () {
  	return (
      <div className="h-48 w-full sm:w-4/5 mx-auto my-6 pr-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={this.formatData()}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey="result" stroke="#36a8f9" activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
      </div>


    );
  }
}

export default BasicLineChart