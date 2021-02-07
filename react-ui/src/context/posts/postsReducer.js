import { 
    GET_POSTS, 
    GET_POST,
    GET_TRENDING,
    GET_RECENT,
    GET_FEATURED,
    POSTS_ERROR
} from '../types'

export default (state, {type, payload}) => {
    switch(type) {
        case GET_POSTS:
        return {
            ...state,
            posts: payload,
            error: null
        }
        case GET_POST:
        return {
            ...state,
            post: payload,
            error: null
        }
        case GET_TRENDING:
            return {
                ...state,
                trending: payload,
                error: null,
            }
        case GET_RECENT:
            return {
                ...state,
                recent: payload,
                error: null,
            } 
        case GET_FEATURED: 
            return {
                ...state,
                featured: payload,
                error: null,
            } 
        case POSTS_ERROR:
             return {
                 ...state,
                 error: payload,
             }   
        default: 
            return state         
    }
}