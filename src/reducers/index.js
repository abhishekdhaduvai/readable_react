import { combineReducers } from 'redux';

const initialState = {
  "loading": true,
  "posts":[],
  "activeSub": "/",
  "sortBy":"Score"
}

function site(state=initialState, action){
  switch (action.type){
    
    case "LOADING": {
      return {
        ...state,
        loading: true
      }
    }

    case "FETCH_POSTS": {
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    }
    
    case "CHANGE_SUB": {
      return {
        ...state,
        activeSub: action.payload
      }
    }

    case "CHANGE_SORT": {
      return {
        ...state,
        sortBy: action.payload
      }
    }

    case "UP_VOTE": {
      let temp = Object.assign({},action.payload);
      temp.voteScore++;
      return {
        ...state
      }
    }

    default:
      return state
  }
}

export default combineReducers({
  site
})