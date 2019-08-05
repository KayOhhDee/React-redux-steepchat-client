import { apiCall } from "../../services/api";
import { addError } from "./error";
import { setCurrentUser } from "./auth";
import { LOADING_USER } from "../actionTypes";


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
  console.log(id)
  return apiCall('put', `/api/user/${id}`, details)
    .then(_ => {dispatch(getUserInfo())})
    .catch(error => dispatch(addError(error)))
} 