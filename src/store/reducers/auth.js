import AuthActions from '../actions/auth'
const {SET_USER, UNSET_USER} = AuthActions

const auth = (state = {checkedAuth: false}, action) => {
    switch (action.type) {
      case SET_USER:
        return state = {checkedAuth: true, user: action.payload}
      case UNSET_USER:
      return state = {checkedAuth: false, user: {}}
      default:
        return state
    }
  }
  
  export default auth