import { DataAccess, Domain } from "../../../../DAL";
import ApiEndPoint from "../../../../ApiEndpoints";
import axios from 'axios';
import { AsyncStorage, Alert } from "react-native";


export const loading = bool => ({
  type: "LOADING",
  isLoading: bool
});

export const success = success => ({
  type: "CRICPOCKET_SUCCESS",
  data: success
});

export const error = error => ({
  type: "CRICPOCKET_ERROR",
  error
});


export const setCricpocketInfo = Info => ({
  type: "SET_CRICPOCKET_INFO",
  Info
});


//Current user cricpocket
export const LoadCricpocket = () => async dispatch => {
  try {
    let Endpoint = `/api/cricpocket/me`;
    let response = await DataAccess.Get(Endpoint);
    console.log(response);
    dispatch(setCricpocketInfo(response))
    return dispatch(success(response));
  } catch (error) {
    console.log('load cricpocket error')
    dispatch(error("Something Went Wrong" || "ERROR"));
  }
};


//Find a cricpocket Account
export const LoadReceiver = (Obj) => async dispatch => {
  try {
    let Endpoint = `/api/cricpocket/find`;
    console.log(Obj)
        let response = await DataAccess.PostSecured(Endpoint, Obj);
        console.log(response);
        return dispatch(success(response));
  } catch (error) {
    console.log('load transaction receiver error')
    return dispatch(error(error || "ERROR"));
  }
};

//Transfer Amount
export const TransferAmount = (Obj) => async dispatch => {
  try {
        let Endpoint = `/api/cricpocket_transactions/transfer`;
        let response = await DataAccess.PostSecured(Endpoint, Obj);
        console.log(response);
        return dispatch(success(response));
  } catch (error) {
    console.log('cricpocket transfer error')
    dispatch(error(error || "ERROR"));
  }
};

//Withdraw Amount
export const WithdrawAmount = (Obj) => async dispatch => {
  try {
    let Endpoint = `/api/cricpocket_transactions/withdraw`;
        let response = await DataAccess.PostSecured(Endpoint, Obj);
        console.log(response);
        return dispatch(success(response));
    
  } catch (error) {
    console.log('cricpocket withdraw error')
    dispatch(error(error || "ERROR"));
  }
};

//Deposit Amount
export const DepositAmount = (Obj) => async dispatch => {
  let token = await AsyncStorage.getItem('@token');
  try {
        let Endpoint = `/api/cricpocket_transactions/deposit`;
        let response = await DataAccess.PostSecured(Endpoint, Obj);
      console.log({response : response});
        return dispatch(success(response));

  } catch (error) {
    console.log('cricpocket deposit error')
    dispatch(error(error || "ERROR"));
  }
};

//Create Cricpocket
export const CreateCricpocket = () => async dispatch => {
  try {
        let Endpoint = `/api/cricpocket`;
        let response = await DataAccess.Put(Endpoint);
        console.log(response);
        dispatch(setCricpocketInfo(response));
        return dispatch(success(response));
  } catch (error) {
    console.log('create cricpocket error')
    dispatch(error(error || "ERROR"));
  }
};


  