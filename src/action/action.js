import axios from "axios";
let url=process.env.REACT_APP_BASE_URL; 

//define action types
export const UPDATE_ITEM="UPDATE_ITEM";
export const CREATE_SUCCESS="CREATE_SUCCESS";
export const CREATE_ERROR="CREATE_ERROR";

export function updateItem(){
    return{
        type:UPDATE_ITEM,
    }
}
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

export function deleteItem(itemNumber){
    return async function(dispatch){
        dispatch(updateItem())
        try {
            const result= await axios.get(`${url}/${itemNumber}`)
            dispatch(createWebSuccess(result.data))
        } catch (error) {
            dispatch(createWebError(error))
        }
    }
}