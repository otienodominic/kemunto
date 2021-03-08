import {GET_POST, GET_POSTS, SUCCESS, POST_ERROR} from './types'
export default(state, {type, payload}) => {
    switch(type){
        case GET_POST:
            return {
                ...state,
                post: payload,
                error: null,
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                error: null,
                loading: false
            }    
        case SUCCESS:
            return {
                error: null,
                loading: false
            }
        case POST_ERROR:
        return {
            error: true,
            loading: false
        }
         default:
             return state   
    }
}
