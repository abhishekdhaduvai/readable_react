import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
        category:"",
        open: false
    }

    handleClose = () => {
        this.setState({open: false})
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
        if(this.state.title === "" ||
            this.state.category === "" ||
            this.state.username === "") {
            this.setState({open: true});
        }
        else {
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
                window.location = '/'
            });
        }
    }

    render(){
        const { username, title, body, category } = this.state;
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div>
                <div className="input-field">
                    <div className="mandatory">Username</div>
                    <input 
                        type="text" 
                        value={username}
                        onChange = {(e) => (this.setState({username:e.target.value}))}/>
                </div>
                <div className="input-field">
                    <div className="mandatory">Title</div>
                    <input 
                        type="text" 
                        value={title}
                        onChange = {(e) => (this.setState({title:e.target.value}))}/>
                </div>
                <div className="input-field">
                    <div>Body</div>
                    <input 
                        type="text" 
                        value={body}
                        onChange = {(e) => (this.setState({body:e.target.value}))}/>
                </div>
                <div className="input-field">
                    <div className="mandatory">Category</div>
                    <input 
                        type="text" 
                        value={category}
                        onChange = {(e) => (this.setState({category:e.target.value}))}/>
                </div>
                <div style={{marginLeft: "1em", marginBottom:"0.5em"}}>
                    <span style={{color:"red"}}>* </span>required
                </div>
                <RaisedButton 
                    label="Submit" 
                    secondary={true} 
                    onClick={() => this.createPost()}
                    style={{marginLeft: "1em"}}/>

                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        Fill all required fields
                    </Dialog>
            </div>
        )
    }
}

export default NewPost;