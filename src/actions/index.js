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
export const DELETE_POST = 'DELETE_POST'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const CHANGE_SUB = 'CHANGE_SUB'
export const CHANGE_SORT = 'CHANGE_SORT'
export const CHANGE_COMMENTS_SORT = 'CHANGE_COMMENTS_SORT'
export const POST_COMMENT = 'POST_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export function fetchPosts(category) {
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

export function deletePost(id) {
  return function(dispatch){
    axios.delete(`${api}/posts/${id}`, {headers})
    .then(response => {
      dispatch({type: DELETE_POST, payload: id})
    })
  }
}

export function fetchPost(id) {
  return function(dispatch){
    dispatch({type: LOADING})
    axios.get(`${api}/posts/${id}`, {headers})
    .then(response => {
      dispatch({type: FETCH_POST, payload: response.data});
    })
  }
}

export function fetchComments(id) {
  return function(dispatch){
    axios.get(`${api}/posts/${id}/comments`, {headers})
    .then(response => {
      dispatch({type: FETCH_COMMENTS, payload: response.data});
    })
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

export function changeCommentsSort(sort){
  return function(dispatch){
    dispatch({type: CHANGE_COMMENTS_SORT, payload: sort})
  }
}

export function postComment(comment){
  return function(dispatch){
    axios.post(`${api}/comments`, comment, {headers})
    .then(response => {
      dispatch({type: POST_COMMENT, payload: comment})
    })
  }
}

export function upVoteComment(id){
  return function(dispatch){
    const body = {"option": "upVote"}
    axios.post(`${api}/comments/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: DOWN_VOTE_COMMENT, payload: response.data})
    })
  }
}

export function downVoteComment(id){
  return function(dispatch){
    const body = {"option": "downVote"}
    axios.post(`${api}/comments/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: DOWN_VOTE_COMMENT, payload: response.data})
    })
  }
}