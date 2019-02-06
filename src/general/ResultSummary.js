import React from 'react'
import moment from 'moment'

const ResultSummary = (props) => {

    const {metric, results} = props

    const formatTime = (value) => {
        const minutes = Math.floor(value / 60);
        const seconds = value - (minutes * 60)
        return `${minutes}:${seconds}`
    }

    const bestResult = () => {
        const sorted = Array.prototype.slice.call(results).sort( (a,b) => {
            if(metric.higher_is_better){
              return b.value - a.value
            }
            return a.value - b.value
        })
        const topResult = sorted[0];
        if(!topResult){
            return ''
        }
        if(metric.time && topResult){
            return formatTime(topResult.value)
        }
        return topResult.value ? `${topResult.value}${metric.unit}` : ''
    }


    const mostRecent = () => {
        const sorted = Array.prototype.slice.call(results).sort( (a,b) => {
            if(metric.higher_is_better){
                return moment(a.date).unix() - moment(b.date).unix()
              }
              return moment(b.date).unix() - moment(a.date).unix()
        })
        const recent = sorted[0];
        if(!recent){
            return ''
        }
        return `${moment(recent.date).format("Do MMM YYYY, h:mma")}`
    }


  	return (
        <div className="flex flex-row text-center items-center">
            <p className="text-left">Best:</p>
            <h4 className="text-xl mx-3">{bestResult()}</h4>
            <p>{mostRecent()}</p>
        </div>
    );
  }


export default ResultSummary