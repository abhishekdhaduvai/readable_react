import React from 'react';
import Votes from './Votes'
import Timestamp from './Utils/Timestamp';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { deletePost } from '../actions'

class Post extends React.Component{

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
        // this.setState({open:true})
        this.props.deletePost(id);
    }

    render() {
        const { post } = this.props;
        return (
            <div>
                {post.deleted === false && (
                    <div className="post">
                        <Votes post={post} />
                        <div className="post-info">
                            <div className="post-title">
                                <a href="comments/">{post.title}</a>
                            </div>
                            <div className="post-details">
                                submitted <Timestamp time={post.timestamp}/> by <a>{post.author}</a> to <a href={post.category}>{post.category}</a>
                            </div>
                            <div className="comments-button">
                                <a href= "comments/">comments</a>
                            </div>
                            <div className="delete-button">
                                <a href="" onClick={() => this.confirmDelete()}>delete</a>
                            </div>
                        </div>
                        {this.state.open && (
                            <div>HELLO WORLD!!!</div>
                        )}
                    </div>
                )}
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