import axios from 'axios';

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const VOTE = 'VOTE'
export const CHANGE_SUB = 'CHANGE_SUB'

export function castVote ({postId, vote}) {
  return {
    type: VOTE,
    postId,
    vote
  }
}

export function fetchPosts () {
  return function(dispatch){
    axios.get(`${api}/posts`, { headers })
    .then((response) => {
      dispatch({type: FETCH_POSTS, payload: response.data})
    })
  }
}