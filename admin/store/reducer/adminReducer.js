import ACTION_CONSTANTS from '../actions/actionTypes'


const initialState = {
    adminData:JSON.parse(typeof window!=='undefined'&& localStorage.getItem("admin"))

  }
  
const adminDetails = (state = initialState, action)=>{
    switch(action.types){
        case ACTION_CONSTANTS.ADMIN_DETAILS:
            return {...state,adminData:action.payload};
        default:
            return state;    
    }
}

export default adminDetails;