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

export const LOADING = 'LOADING'
export const FETCH_POSTS = 'FETCH_POSTS'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const CHANGE_SUB = 'CHANGE_SUB'
export const CHANGE_SORT = 'CHANGE_SORT'

export function fetchPosts (category) {
  return function(dispatch){
    dispatch({type: LOADING})
    if(category === undefined){
      axios.get(`${api}/posts`, { headers })
      .then((response) => {
        dispatch({type: FETCH_POSTS, payload: response.data})
      })
    }
    else {
      axios.get(`${api}/${category}/posts`, { headers })
      .then((response) => {
        dispatch({type: FETCH_POSTS, payload: response.data})
      })
    }
  }
}

export function upVote(id){
  return function(dispatch){
    const body = {"option": "upVote"}
    axios.post(`${api}/posts/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: UP_VOTE, payload: response.data})
    })
  }
}

export function downVote(id){
  return function(dispatch){
    const body = {"option": "downVote"}
    axios.post(`${api}/posts/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: DOWN_VOTE, payload: response.data})
    })
  }
}

export function changeSort(sort){
  return function(dispatch){
    dispatch({type: CHANGE_SORT, payload: sort})
  }
}

export function changeSub(data){
  return function(dispatch){
    dispatch({type: CHANGE_SUB, payload: data})
  }
}