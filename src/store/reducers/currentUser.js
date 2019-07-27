import { SET_CURRENT_USER, LOADING_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  loading: false,
  user: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!(Object.keys(action.user).length),
        loading: false,
        user: action.user
      };
    case LOADING_USER: 
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}