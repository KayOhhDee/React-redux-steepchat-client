import { apiCall } from "../../services/api";
import { addError } from "./error";
import { setCurrentUser } from "./auth";
import { loadMessages } from "./messages";
import { LOADING_USER, LOADING_DATA } from "../actionTypes";


export const getUserInfo = () => (dispatch, getState) => {
  dispatch({type: LOADING_USER});
  let { currentUser } = getState();
  const id = currentUser.user.id ? currentUser.user.id : currentUser.user._id;
  return apiCall("get", `/api/user/${id}`)
    .then(user => dispatch(setCurrentUser({...user})))
    .catch(error => dispatch(addError(error)));
}

export const uploadRequest = ( data ) => (dispatch, getState) => {  
  dispatch({ type: LOADING_USER });
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall('put', `/api/user/${id}/image`, data)
    .then( _ => {dispatch(getUserInfo())})
    .catch(error => dispatch(addError(error)))
}   

export const editUserInfo = (details) => (dispatch, getState) => {
  dispatch({ type: LOADING_USER });
  let { currentUser } = getState();
  console.log(currentUser)
  const id = currentUser.user._id;
  return apiCall('put', `/api/user/${id}`, details)
    .then(_ => {dispatch(getUserInfo())})
    .catch(error => dispatch(addError(error)))
} 

export const getUserData = user_id => dispatch => {
  dispatch({ type: LOADING_DATA });
  return apiCall('get', `/api/users/${user_id}`)
    .then(data => {
      dispatch(loadMessages(data.messages))
      dispatch(getUserInfo());
    })
    .catch(err => dispatch(addError(err)))
}