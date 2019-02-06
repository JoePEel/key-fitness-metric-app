import api from '../../services/api'
import moment from 'moment'

const SET_ALL_METRICS = 'SET_ALL_METRICS'
const SET_SELECTED_METRIC = 'SET_SELECTED_METRIC'
const UPDATE_SELECTED_METRIC = 'UPDATE_SELECTED_METRIC'
const SORT_RESULT_BY_DATE = 'SORT_RESULT_BY_DATE'
const SORT_RESULT_BY_VALUE = 'SORT_RESULT_BY_VALUE'


export const addMetric = (formData) => {
    return async (dispatch, getState) => {

        let res = await api.post('api/metric', formData)
        res = await api.get('/api/metric')
        dispatch({ type: SET_ALL_METRICS, payload: res.data.metrics})
    }
}

export const getSingleMetric = (id) => {
    return async (dispatch, getState) => {

        let res = await api.get(`api/metric/${id}`)

        dispatch({ type: SET_SELECTED_METRIC, payload: res.data})
    }
}

export const updateMetric = (metricId, formData) => {
    return async (dispatch, getState) => {
        console.log(formData)
        let res = await api.post(`api/metric/update`, {
            ...formData
        })
        dispatch({ type: UPDATE_SELECTED_METRIC, payload: res.data.metric})
        
        res = await api.get('/api/metric')
        dispatch({ type: SET_ALL_METRICS, payload: res.data.metrics})
    }
}


export const deleteMetric = (metricId) => {
    return async (dispatch, getState) => {
        let res = await api.post(`api/metric/delete`, {
            id: metricId
        })
        dispatch({ type: UPDATE_SELECTED_METRIC, payload: {}})
        
        res = await api.get('/api/metric')
        dispatch({ type: SET_ALL_METRICS, payload: res.data.metrics})
    }
}


export const addResult = (metricId, formData) => {
    return async (dispatch, getState) => {

        let res = await api.post('/api/result', {
            id: metricId,
            value: formData.value,
            date: formData.date
        })

        res = await api.get(`/api/metric/${metricId}`)

        dispatch({ type: SET_SELECTED_METRIC, payload: res.data})
    }
}

export const deleteResult = (metricId, resultId) => {
    return async (dispatch, getState) => {

        let res = await api.post('/api/result/delete', {
            metric_id: metricId,
            id: resultId
        })

        res = await api.get(`/api/metric/${metricId}`)

        dispatch({ type: SET_SELECTED_METRIC, payload: res.data})
    }
}

export const updateResult = (metricId, formData) => {
    return async (dispatch, getState) => {
        console.log(formData)
        let res = await api.post('/api/result/update', {
            metric_id: metricId,
            id: formData.id,
            value: formData.value,
            date: formData.date
        })
        console.log(res.data)

        res = await api.get(`/api/metric/${metricId}`)

        dispatch({ type: SET_SELECTED_METRIC, payload: res.data})
    }
}


export const sortResult = (type, order) => {
    return {
        type: SORT_RESULT_BY_VALUE,
        payload: {
            type,
            order
        }
    }
}


export default  {
    SET_ALL_METRICS,
    SET_SELECTED_METRIC,
    UPDATE_SELECTED_METRIC,
    SORT_RESULT_BY_DATE,
    SORT_RESULT_BY_VALUE
}