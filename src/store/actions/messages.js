import { apiCall } from '../../services/api';
import { addError } from './error';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => {
  return dispatch => {
    return apiCall('get', '/api/messages')
      .then(data => dispatch(loadMessages(data))
      .catch(err => addError(err.message))
    )
  }
}