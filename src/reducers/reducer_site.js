const initialState = {
  "loading": true,
  "categories": [],
  "posts":[],
  "sortBy":"Score"
}

export function site(state=initialState, action){
  switch (action.type){
    
    case "LOADING": {
      return {
        ...state,
        loading: true
      }
    }

    case "FETCH_CATEGORIES": {
      return {
        ...state,
        categories: action.payload.categories
      }
    }

    case "FETCH_POSTS": {
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    }

    case "UPDATE_POST": {
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? { 
            ...post, 
            title: action.payload.title, 
            body: action.payload.body}: post)
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