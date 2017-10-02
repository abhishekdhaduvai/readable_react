import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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

class NewPost extends Component {

    state = {
        username:"",
        title:"",
        body:"",
        category:""
    }

    updateUsername = (input) => {
        this.setState({username:input})
    }

    updateTitle = (input) => {
        this.setState({title:input})
    }

    updateBody = (input) => {
        this.setState({body:input})
    }

    updateCategory = (input) => {
        this.setState({category:input})
    }

    uuid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '' + s4() + '' + s4() + '' + s4();
    }

    createPost = () => {
        let payload = {
            id: this.uuid(),
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.username,
            category: this.state.category
        }

        axios.post(`${api}/posts`, payload, { headers })
        .then(response => {
            this.setState({
                username:"",
                title:"",
                body:"",
                category:""
            });
        })
    }

    render(){
        const { username, title, body, category } = this.state;
        return (
            <div>
                <div className="input-field">
                    <div>Username</div>
                    <input 
                        type="text" 
                        value={username}
                        onChange = {(e) => (this.updateUsername(e.target.value))}/>
                </div>
                <div className="input-field">
                    <div className="mandatory">Title</div>
                    <input 
                        type="text" 
                        value={title}
                        onChange = {(e) => (this.updateTitle(e.target.value))}/>
                </div>
                <div className="input-field">
                    <div>Body</div>
                    <input 
                        type="text" 
                        value={body}
                        onChange = {(e) => (this.updateBody(e.target.value))}/>
                </div>
                <div className="input-field">
                    <div className="mandatory">Category</div>
                    <input 
                        type="text" 
                        value={category}
                        onChange = {(e) => (this.updateCategory(e.target.value))}/>
                </div>
                <div>required</div>
                <RaisedButton 
                    label="Submit" 
                    secondary={true} 
                    onClick={() => this.createPost()}/>
            </div>
        )
    }
}

export default NewPost;