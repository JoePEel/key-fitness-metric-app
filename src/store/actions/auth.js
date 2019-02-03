import api from '../../services/api'
import history from '../history'

export const checkAuth = () => {
    return async (dispatch, getState) => {

        let res = await api.get('/api/user')
        if(!res.data.user){
            dispatch({ type: 'UNSET_USER' })
        }
        dispatch({ type: 'SET_USER', payload: res.data.user})

        res = await api.get('/api/metric')
        dispatch({ type: 'SET_ALL_METRICS', payload: res.data.metrics})
    }
}


export const logout = () => {
    return async (dispatch) => {
        await api.get('/logout')
        dispatch({ type: 'UNSET_USER' })
        // history.push('/')
        
    }

}

export default  {
    SET_USER: 'SET_USER',
    SET_ALL_METRICS: 'SET_ALL_METRICS',
    UNSET_USER: 'UNSET_USER'
}