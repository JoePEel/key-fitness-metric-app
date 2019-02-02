import MetricActions from '../actions/metrics'
import moment from 'moment'

const {SET_ALL_METRICS,
      SET_SELECTED_METRIC,
      UPDATE_SELECTED_METRIC,
      SORT_RESULT_BY_DATE,
      SORT_RESULT_BY_VALUE
    } = MetricActions

const metrics = (state = {selectedMetric: {}}, action) => {
    switch (action.type) {

      case SET_ALL_METRICS:
        return state = {...state, all: action.payload}

      case SET_SELECTED_METRIC:
        return state = {...state, selectedMetric: action.payload}

      case UPDATE_SELECTED_METRIC:
        return state = {...state, selectedMetric: {
            ...state.selectedMetric,
            metric: action.payload
          }
        }

      case SORT_RESULT_BY_VALUE:

        const sorted = Array.prototype.slice.call(state.selectedMetric.results).sort( (a,b) => {
          if(action.payload.type == 'value'){
            return action.payload.order == 'asc' ? a.value - b.value : b.value - a.value
          }
          return action.payload.order == 'asc' ? moment(a.date).unix() - moment(b.date).unix() : moment(b.date).unix() - moment(a.date).unix()
        })
        return state = {...state, selectedMetric: {
          ...state.selectedMetric,
          results: sorted
          }
        }
      
          
      default:
        return state
    }
  }
  
  export default metrics