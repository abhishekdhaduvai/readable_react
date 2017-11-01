import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

import { connect } from 'react-redux';
import * as Actions from '../actions';

class NewPost extends Component {

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
            let newPost = {
                id: this.uuid(),
                timestamp: Date.now(),
                title: this.state.title,
                body: this.state.body,
                author: this.state.username,
                category: this.state.category
            }

            this.props.createPost(newPost)
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
        const { site } = this.props;
        let cat = [];
        if(site.categories.length > 0){
            site.categories.map(category => cat.push(category.name))
        }
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
                        dataSource={cat}
                        onUpdateInput={(val) => {
                            this.setState({category: val})
                            this.setState({categories: cat})
                        }}/>
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

// export default NewPost;

function mapStateToProps ({ site }) {
  return {
    site
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (post) => dispatch(Actions.createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)