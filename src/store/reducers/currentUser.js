import { SET_CURRENT_USER, LOADING_USER, LIKE_MESSAGE, UNLIKE_MESSAGE, READ_NOTIFICATIIONS  } from '../actionTypes';

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
    case LIKE_MESSAGE: 
      return {
        ...state,
        user: {
          ...state.user,
          likes: [
            ...state.user.likes,
            {
              user: state.user._id,
              message: action.message._id
            }
          ]
        }
      }
    case UNLIKE_MESSAGE:
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.filter(l => l.message !== action.message._id)
        }
      };
    case READ_NOTIFICATIIONS:
      state.user.notifications.forEach( n => n.read = true)
      return {
        ...state
      }
    default:
      return state;
  }
}