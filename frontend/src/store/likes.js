// constants
import csrfFetch from "./csrf"
import { receivePosts } from "./posts"
const RECEIVE_LIKES = 'api/RECEIVELIKES'
const DELETE_LIKE = 'api/RECEIVELIKES'
const RECEIVE_LIKE = 'api/RECEIVELIKE'

// actions 

export const receiveLikes = (payload) =>({
    // will be called when fetching posts
    // will update likes to be contain the likes for the posts in the state

    type: RECEIVE_LIKES,
    payload
})
export const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
})
export const deleteLike = (likeid) => ({
    // only remove the like if sessionUser id matches the like id
    // can handle that in the frontend
    // 
    type: DELETE_LIKE,
    likeid
})
//getter
export const postLikes = (postid) => (state) => {
    return state?.likes ? Object.values(state.likes).filter((like)=>like.postId ===postid) : null;
    
}
//thunk actions 
//will need a createlike and deletelike thunk action
// no need for thunk action to receive likes
// can receive likes from post fetches since likes will be associated with the likes from that post 
export const fetchUserLikes = () => async dispatch => {
    let response = await fetch('/api/likes')
    
    // will fetch all likes for a user, payload will include the posts as well
    // wil need to call dispatch(receivePosts(payload.posts))

    if (response.ok){
        let data = response.json();
        dispatch(receivePosts(data.posts))
        dispatch(receiveLikes(data.likes))
        return data
    }
}
export const removeLike = (likeid) => async dispatch => {
    let response = await csrfFetch(`/api/likes/${likeid}`,
    {method:'DELETE'})
    if (response.ok){
        //return likes with deleted user like
        dispatch(deleteLike(likeid))
        return response;
    }
}
export const createLike = (like) => async dispatch => {
    let response = await csrfFetch('/api/likes',{
    body: JSON.stringify(like),
    method: "POST"
        });
    if (response.ok){
        let data = await response.json();
        dispatch(receiveLike(data));
        return data.id
    }

    //fetch like creation

    // if response is ok, 
    //update the state to include the new like 

}

const likesReducer = (state={},action) =>{
    const newState = {...state};

    switch (action.type) {
        case RECEIVE_LIKES:
            //will receive likes for posts currently in state
            return {...newState,...action.payload}
            
        case DELETE_LIKE:
            delete newState[action.likeid]
            return newState;
        case RECEIVE_LIKE:
            newState[action.like.id] = action.like;
            return newState
        default:
            return newState;
    }
}

export default likesReducer;



