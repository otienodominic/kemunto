export const initialState = null

export const AuthReducer=(state, action)=>{
  if(action.type==="USER"){
    return action.payload
  }
  if(action.type==="CLEAR"){
    return null
  }
  if(action.type==="UPDATE"){
    return {
      ...state,
      db_profile: action.payload
    }
  }
  return state
}


















// export const AuthReducer = (state, action) => {
//     switch(action.type) {
//       case ACTION_TYPES.USER:
//         return {
//           payload: action.payload
//         }
//       case ACTION_TYPES.CLEAR:
//         return null
//         case ACTION_TYPES.UPDATE:
//           return {
//             ...state,
//             followers:action.payload.followers,
//             following:action.payload.following
//           }
//         case ACTION_TYPES.UPDATEPIC:
//           return {
//             ...state,
//             pic:action.payload
//           }        
//       default:
//         return state
//     }
// }