import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';
import Timestamp from './Utils/Timestamp';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import * as Actions from '../actions';

class Post extends React.Component{

    PropTypes = {
        post: PropTypes.object.isRequired,
    }

    state = {
        editOpen: false,
        deleteOpen: false,
        newTitle: "",
        newBody: ""
    }

    handleClose = (input) => {
        if(input === "Yes"){
            this.props.deletePost(this.props.post.id)
        }
        this.setState({deleteOpen: false});
    };

    openEdit = () => {
        this.setState({editOpen: true});
        this.setState({newTitle: this.props.post.title});
        this.setState({newBody: this.props.post.body});
    }

    updatePost = () => {
      let updatedPost = {
        id: this.props.post.id,
        title: this.state.newTitle || this.props.post.title,
        body: this.state.newBody || this.props.post.body
      }
      this.props.updatePost(updatedPost)
      this.setState({editOpen: false})
    }

    render() {
        const { post } = this.props;
        const { editOpen, deleteOpen } = this.state;
        const editActions = [
            <FlatButton
                label="Confirm"
                primary={true}
                onClick={() => this.updatePost()}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.setState({editOpen: false})}
            />
        ];
        const deleteActions = [
            <FlatButton
                label="Yes"
                primary={true}
                onClick={() => this.handleClose("Yes")}
            />,
            <FlatButton
                label="No"
                primary={true}
                onClick={() => this.handleClose("No")}
            />
        ];
        return (
            <div>
                {!post.deleted && (
                    <div className="post">
                        <Votes post={post} />
                        <div className="post-info">
                            <div className="post-title">
                                <a href={`${post.category}/${post.id}`}>{post.title}</a>
                            </div>
                            <div className="post-details">
                                submitted <Timestamp time={post.timestamp}/> by <a>{post.author}</a> to <a href={post.category}>{post.category}</a>
                            </div>
                            <div className="comments-button">
                                <a href= {`${post.category}/${post.id}`}><span>{post.comments}</span> comments</a>
                                <span> | </span> 
                                <a onClick={() => this.openEdit()}>edit</a>
                                <span> | </span> 
                                <a onClick={() => this.setState({deleteOpen: true})}>delete</a>
                            </div>
                        </div>
                        <Dialog
                            actions={editActions}
                            modal={false}
                            open={editOpen}
                            onRequestClose={() => this.setState({editOpen: false})}>
                            <div style={{display: "flex"}}>
                                <div>
                                    <span>New Title: </span>
                                    <textarea 
                                        rows="3"
                                        cols="50"
                                        value={this.state.newTitle} 
                                        onChange = {e => (this.setState({newTitle: e.target.value}))} />
                                </div>
                                <div>
                                    <span>New Body: </span>
                                    <textarea 
                                        rows="5" 
                                        cols="50"
                                        value={this.state.newBody}
                                        onChange = {e => (this.setState({newBody: e.target.value}))} />
                                </div>
                            </div>
                        </Dialog>
                        <Dialog
                            actions={deleteActions}
                            modal={false}
                            open={deleteOpen}
                            onRequestClose={() => this.setState({deleteOpen: false})}>
                            Are you sure you want to delete this post?
                        </Dialog>
                    </div>
                )}
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (post) => dispatch(Actions.updatePost(post)),
    deletePost: (id) => dispatch(Actions.deletePost(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Post)