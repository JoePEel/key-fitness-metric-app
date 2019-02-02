import api from '../../services/api'


export const checkAuth = () => {
    return async (dispatch, getState) => {

        let res = await api.get('/api/user')
        if(!res.data.user){
            return//redirect to login
        }
        dispatch({ type: 'SET_USER', payload: res.data.user})

        res = await api.get('/api/metric')
        dispatch({ type: 'SET_ALL_METRICS', payload: res.data.metrics})
    }
}

export default  {
    SET_USER: 'SET_USER',
    SET_ALL_METRICS: 'SET_ALL_METRICS'
}