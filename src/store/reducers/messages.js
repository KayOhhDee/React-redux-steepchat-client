import { 
  LOAD_MESSAGES, 
  REMOVE_MESSAGE, 
  LOAD_MESSAGE,
  LOADING_DATA, 
  LIKE_MESSAGE, 
  UNLIKE_MESSAGE 
  } from '../actionTypes';

const DEFAULT_STATE = {
  messages: [],
  message: [],
  loading: false
}

export default (state= DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: action.messages,
        loading: false
      }
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(message => message._id !== action.id)
      }
    case LIKE_MESSAGE:
    case UNLIKE_MESSAGE:
      let idx = state.messages.findIndex(message => message._id === action.message._id)
      state.messages[idx] = action.message
      return {
        ...state
      }
    default:
      return state;
  }
}