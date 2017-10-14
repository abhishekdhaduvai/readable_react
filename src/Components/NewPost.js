import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
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

    componentDidMount(){
        const api = "http://localhost:3001";

        // Generate a unique token for storing your bookshelf data on the backend server.
        let token = localStorage.token
        if (!token)
        token = localStorage.token = Math.random().toString(36).substr(-8)

        const headers = {
        'Accept': 'application/json',
        'Authorization': token
        }

        axios.get(`${api}/categories`, {headers})
        .then(response => {
            let cat = []
            response.data.categories.map(category => cat.push(category.name))
            this.setState({categories: cat});
        })
    }

    state = {
        categories: [],
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
            this.state.username === "" || 
            !this.state.categories.includes(this.state.category)) {
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

    style = {
        fontSize: "initial",
        background: "white",
        borderRadius: "2px",
        width: "unset",
        display: "block",
        border: "1px solid grey"
    }

    render(){
        const { username, title, body } = this.state;
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
                    <AutoComplete
                        style={this.style}
                        hintText="Category"
                        dataSource={this.state.categories}
                        onUpdateInput={(val) => this.setState({category: val})}/>
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
                    Fill all required fields and/or check if category exists
                </Dialog>
            </div>
        )
    }
}

export default NewPost;