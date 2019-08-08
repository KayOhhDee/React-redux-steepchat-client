import { 
  LOAD_MESSAGES, 
  REMOVE_MESSAGE, 
  LOAD_MESSAGE,
  LOADING_DATA,
  POST_MESSAGE, 
  LIKE_MESSAGE, 
  UNLIKE_MESSAGE 
  } from '../actionTypes';

const DEFAULT_STATE = {
  messages: [],
  message: { user: { }, comments:[ ] },
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
    case LOAD_MESSAGE: 
      return {
        ...state,
        message: action.message
      }
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case POST_MESSAGE: 
      return {
        ...state,
        messages: [
          action.message,
          ...state.messages
        ]
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
      if(state.message._id === action.message._id) {
        state.message = action.message
      }
      return {
        ...state
      }
    default:
      return state;
  }
}