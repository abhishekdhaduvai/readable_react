import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';
import Timestamp from './Utils/Timestamp';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { deletePost } from '../actions'

class Post extends React.Component{

    PropTypes = {
        post: PropTypes.object.isRequired,
        deletePost: PropTypes.func.isRequired
    }

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    confirmDelete = (id) => {
        alert("Hello")
    }

    render() {
        const { post } = this.props;
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div>
                {post.deleted === false && (
                    <div className="post">
                        <Votes post={post} />
                        <div className="post-info">
                            <div className="post-title">
                                <a href={`comments/${post.id}`}>{post.title}</a>
                            </div>
                            <div className="post-details">
                                submitted <Timestamp time={post.timestamp}/> by <a>{post.author}</a> to <a href={post.category}>{post.category}</a>
                            </div>
                            <div className="comments-button">
                                <a href= {`comments/${post.id}`}>comments</a>
                            </div>
                            <div className="delete-button">
                                <a href="" onClick={(e) => this.confirmDelete(e)}>delete</a>
                            </div>
                        </div>
                    </div>
                )}

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

function mapStateToProps () {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)