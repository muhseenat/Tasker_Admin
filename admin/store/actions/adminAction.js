import ACTION_CONSTANTS from './actionTypes';

export const setAdminDetails = (data)=>dispatch=>{
    dispatch({
        type:ACTION_CONSTANTS.ADMIN_DETAILS,
        payload:data
    })
}