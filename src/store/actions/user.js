import { apiCall } from "../../services/api";
import { addError } from "./error";
import { setCurrentUser } from "./auth";
import { LOADING_USER } from "../actionTypes";


export const getUserInfo = () => (dispatch, getState) => {
  dispatch({type: LOADING_USER});
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("get", `/api/user/${id}`)
    .then(user => dispatch(setCurrentUser({...user})))
    .catch(error => dispatch(addError(error)));
}

export const uploadRequest = ( data ) => (dispatch, getState) => {  
  dispatch({ type: LOADING_USER });
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('put', `/api/user/${id}/image`, data)
    .then( _ => {dispatch(getUserInfo())})
    .catch(error => dispatch(addError(error)))
}   