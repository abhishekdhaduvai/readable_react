import { combineReducers } from 'redux';

const initialState = {
  "loading": true,
  "posts":[],
  "sortBy":"Score"
}

const commentState = {
  "post":{},
  "sortBy": "Score",
  "comments":[],
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

    case "DELETE_POST": {
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload ? { ...post, deleted: true } : post)
      }
    }

    case "CHANGE_SORT": {
      return {
        ...state,
        sortBy: action.payload
      }
    }

    case "UP_VOTE": {
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? { ...post, voteScore: action.payload.voteScore}: post)
      }
    }
    
    case "DOWN_VOTE": {
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? { ...post, voteScore: action.payload.voteScore}: post)
      }
    }

    default:
      return state
  }
}

function details(state=commentState, action) {
  switch(action.type){

    case "FETCH_POST": {
      return {
        ...state,
        post: action.payload
      }
    }

    case "FETCH_COMMENTS": {
      return {
        ...state,
        comments: action.payload
      }
    }

    case "CHANGE_COMMENTS_SORT": {
      return {
        ...state,
        sortBy: action.payload
      }
    }

    case "POST_COMMENT": {
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    }

    case "UP_VOTE_COMMENT": {
      return {
        ...state,
        comments: state.comments.map(comment => 
          comment.id === action.payload.id ? { ...comment, voteScore: action.payload.voteScore}: comment)
      }
    }

    case "DOWN_VOTE_COMMENT": {
      return {
        ...state,
        comments: state.comments.map(comment => 
          comment.id === action.payload.id ? { ...comment, voteScore: action.payload.voteScore}: comment)
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export default combineReducers({
  site,
  details
})