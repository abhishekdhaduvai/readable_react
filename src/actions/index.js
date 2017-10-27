import axios from 'axios';
import * as ACTION from './constants';

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function fetchCategories() {  
  return function (dispatch){
    axios.get(`${api}/categories`, {headers})
    .then(response => {
      dispatch({type: ACTION.FETCH_CATEGORIES, payload:response.data})
    })
  }
}

export function fetchPosts(endpoint) {
  return function(dispatch){
    dispatch({type: ACTION.LOADING})
    axios.get(`${api}${endpoint}`, { headers })
    .then((response) => {
      let posts = response.data;
      if(posts.length > 0){
        posts.map(post=>{
          axios.get(`${api}/posts/${post.id}/comments`, {headers}).then(response => {
            post.comments = response.data.length;
          }) //end getting comments
          setTimeout(function(){dispatch({type: ACTION.FETCH_POSTS, payload: posts})}, 1000)
        }) //end loop
      }
      else {
        dispatch({type: ACTION.FETCH_POSTS, payload: posts})
      }
    })
  }
}

export function fetchPost(id) {
  return function(dispatch){
    dispatch({type: ACTION.LOADING})
    axios.get(`${api}/posts/${id}`, {headers})
    .then(response => {
      dispatch({type: ACTION.FETCH_POST, payload: response.data});
    })
  }
}

export function deletePost(id){
  return function(dispatch){
    axios.delete(`${api}/posts/${id}`, {headers})
    .then(response => {      
      dispatch({type: ACTION.DELETE_POST, payload:id})
    })
  }
}

export function fetchComments(id) {
  return function(dispatch){
    axios.get(`${api}/posts/${id}/comments`, {headers})
    .then(response => {
      dispatch({type: ACTION.FETCH_COMMENTS, payload: response.data});
    })
  }
}

export function upVote(id){
  return function(dispatch){
    const body = {"option": "upVote"}
    axios.post(`${api}/posts/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: ACTION.UP_VOTE, payload: response.data})
    })
  }
}

export function downVote(id){
  return function(dispatch){
    const body = {"option": "downVote"}
    axios.post(`${api}/posts/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: ACTION.DOWN_VOTE, payload: response.data})
    })
  }
}

export function changeSort(sort){
  return function(dispatch){
    dispatch({type: ACTION.CHANGE_SORT, payload: sort})
  }
}

export function changeCommentsSort(sort){
  return function(dispatch){
    dispatch({type: ACTION.CHANGE_COMMENTS_SORT, payload: sort})
  }
}

export function postComment(comment){
  return function(dispatch){
    axios.post(`${api}/comments`, comment, {headers})
    .then(response => {
      dispatch({type: ACTION.POST_COMMENT, payload: comment})
    })
  }
}

export function upVoteComment(id){
  return function(dispatch){
    const body = {"option": "upVote"}
    axios.post(`${api}/comments/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: ACTION.DOWN_VOTE_COMMENT, payload: response.data})
    })
  }
}

export function downVoteComment(id){
  return function(dispatch){
    const body = {"option": "downVote"}
    axios.post(`${api}/comments/${id}`, body, {headers})
    .then((response) => {
      dispatch({type: ACTION.DOWN_VOTE_COMMENT, payload: response.data})
    })
  }
}

export function updatePost(post){
  return function(dispatch){
    axios.put(`${api}/posts/${post.id}`, post, {headers})
    .then(response => {
      dispatch({type: ACTION.UPDATE_POST, payload: post})
    })

  }
}

export function createPost(post){
  return function(dispatch){
    new Promise(function(resolve, reject) {
      axios.post(`${api}/posts`, post, {headers})
      .then(res => window.location="/")
    })
  }
}

export function updateComment(comment){
  return function(dispatch){
    axios.put(`${api}/comments/${comment.id}`, comment, {headers})
    .then(response => {
      dispatch({type: ACTION.UPDATE_COMMENT, payload: comment})
    })
  }
}

export function deleteComment(id){
  return function(dispatch){
    axios.delete(`${api}/comments/${id}`, {headers})
    .then(response => {
      dispatch({type: ACTION.DELETE_COMMENT, payload: id})
    })
  }
}