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

    case "UP_VOTE": {
      const temp = state.posts;
      for(var i=0; i<temp.length; i++){
        if(temp[i].id === action.payload.id){
          temp[i].voteScore = action.payload.voteScore;
        }
      }
      return {
        ...state,
        posts: temp
      }
    }
    case "CHANGE_SUB": {
      return {
        ...state,
        activeSub: action.payload
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  site
})