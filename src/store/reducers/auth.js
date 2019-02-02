import AuthActions from '../actions/auth'
const {SET_USER} = AuthActions

const auth = (state = {}, action) => {
    switch (action.type) {
      case SET_USER:
        return state = action.payload
      default:
        return state
    }
  }
  
  export default auth