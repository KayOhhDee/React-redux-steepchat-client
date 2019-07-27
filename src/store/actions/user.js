import { apiCall } from "../../services/api";
import { addError } from "./error";
import { setCurrentUser } from "./auth";


export const getUserInfo = () => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("get", `/api/user/${id}`)
    .then(user => dispatch(setCurrentUser({...user})))
    .catch(error => dispatch(addError(error)));
}

export const uploadRequest = ( data ) => (dispatch, getState) => {  
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('put', `/api/user/${id}/image`, data)
    .then( _ => {dispatch(getUserInfo())})
    .catch(error => dispatch(addError(error)))
}   