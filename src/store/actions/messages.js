import { apiCall } from '../../services/api';
import { addError } from './error';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

const remove = id => ({
  type: REMOVE_MESSAGE,
  id
})

export const fetchMessages = () => {
  return dispatch => {
    return apiCall('get', '/api/messages')
      .then(data => {
        dispatch(loadMessages(data))     
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall('post', `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => dispatch(addError(err.message)));
  }
}