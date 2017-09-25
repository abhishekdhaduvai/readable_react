import { combineReducers } from 'redux';

const initialState = {
  "loading": true,
  "posts":[],
  "activeSub": "/"
}

function site(state=initialState, action){
  switch (action.type){
    case "FETCH_POSTS": {
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    }
    default:
      return state
  }
}

// function castVote (state={}, action){
//   switch (action.type) {
//     case VOTE:
//       const { vote, postId } = action
//       if(vote > 0) {
//         API.voteOnPost(postId, "upVote");
//       }
//       else {
//         API.voteOnPost(postId, "downVote");
//       }
//       return {
//         ...state,
//         // [post.voteScore]: post.voteScore + vote
//       }

//     default:
//       return state
//   }
// }

export default combineReducers({
  site
})