import { DataAccess, Domain } from "../../../../DAL";
import ApiEndPoint from "../../../../ApiEndpoints";
import axios from 'axios';
import { AsyncStorage } from "react-native";


export const loading = bool => ({
  type: "LOADING",
  isLoading: bool
});

export const success = success => ({
  type: "REQUEST_SUCCESS",
  data: success
});

export const error = error => ({
  type: "REQUEST_ERROR",
  error
});


export const setRequestInfo = Info => ({
  type: "SET_REQUEST_INFO",
  Info
});

export const LoadRequests = () => async dispatch => {
  try {
    let Endpoint = `/api/request/incoming`;
      let response = await DataAccess.Get(Endpoint);
      console.log({ApiResponse: response});
      dispatch(setRequestInfo(response))
      return dispatch(success(response));
  } catch (error) {
    console.log('load requests error')
    return dispatch(error(error || "ERROR"));
  }
};
 

