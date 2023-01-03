import axios from "axios";

let url=process.env.REACT_APP_BASE_URL; 

//define action types
export const UPDATE_CHAT="UPDATE_CHAT";
export const CREATE_SUCCESS="CREATE_SUCCESS";
export const CREATE_ERROR="CREATE_ERROR";

export function createWebSuccess(payload){
    return{
        type: CREATE_SUCCESS,
        payload
    }
}

export function createWebError(error){
    return{
        type:CREATE_ERROR,
        error
    }
}

//all api calls are dispatched on action