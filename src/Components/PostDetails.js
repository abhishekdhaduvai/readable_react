import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostVotes from './Votes';
import Comment from './Comment';
import Timestamp from './Utils/Timestamp';
import Sort from './Sort';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { fetchComments, fetchPost, deletePost, updatePost, changeCommentsSort, postComment } from '../actions';

class PostDetails extends Component {

    PropTypes = {
      details: PropTypes.func.isRequired,
      fetchComments: PropTypes.func.isRequired,
      fetchPost: PropTypes.func.isRequired,
      changeCommentsSort: PropTypes.func.isRequired,
      postComment: PropTypes.func.isRequired
    }

    state = {
      newComment: "",
      newTitle: this.props.details.post.title,
      newBody: this.props.details.post.body,
      emptyComment: false,
      submitted: false,
      open: false,
      edit: false,
      editBody: false,
    }

    uuid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '' + s4() + '' + s4() + '' + s4();
    }

    componentWillMount(){
        const id = window.location.pathname.slice(10);
        this.props.fetchComments(id);
        this.props.fetchPost(id);
    }

    changeCommentsSort = (sort) => {
        this.props.changeCommentsSort(sort);
    }

    handleClose = (input) => {
        if(input === "Yes"){
            this.deletePost();
        }
        this.setState({open: false});
    };

    deletePost = () => {
      this.props.deletePost(this.props.details.post.id)
    }

    updatePost = () => {
      let updatedPost = {
        id: this.props.details.post.id,
        title: this.state.newTitle || this.props.details.post.title,
        body: this.state.newBody || this.props.details.post.body
      }
      this.props.updatePost(updatedPost)
      this.setState({edit: false})
      this.setState({editBody: false})
    }
    
    updateComment(comment) {
      if(this.state.newComment !== ""){
        let newComment = {
          id: this.uuid(),
          timestamp: Date.now(),
          body: this.state.newComment,
          author: "anon",
          parentId: this.props.details.post.id
        }
        this.props.postComment(newComment)
        this.setState({submitted: true})
        this.setState({newComment: ""})
      }
      else {
        this.setState({emptyComment: true})
      }
    }

    render(){
      const {post} = this.props.details;
      const {comments} = this.props.details;
      const {sortBy} = this.props.details;

      const actions = [
        <FlatButton
            label="Yes"
            primary={true}
            onClick={() => (this.handleClose("Yes"))}
        />,
        <FlatButton
            label="No"
            primary={true}
            onClick={() => (this.handleClose("No"))}
        />
      ];

      if(comments.length > 0) {
        if(sortBy === "Score"){
            comments.sort(function(a, b){
              return b.voteScore - a.voteScore
            })
        }
        else if(sortBy === "Controversial"){
            comments.sort(function(a, b){
              return a.voteScore - b.voteScore
            })
        }
        else {
            comments.sort(function(a, b){
              return b.timestamp - a.timestamp
            })
        }
      }

      return (
        <div>
          <div className="post" style={{boxShadow:"none", marginBottom:"0px"}}>
            <PostVotes post={post} />
            <div className="post-info">
                <div className="post-title">
                    {!this.state.edit && <span>{post.title}</span>}
                    {this.state.edit && 
                      <span>
                        <textarea 
                          rows="4" 
                          cols="50"
                          value={this.state.newTitle}
                          onChange={(e) => (this.setState({newTitle: e.target.value}))} />
                        <br />
                        <button onClick={() => {this.updatePost()}}>Update</button>
                        <button onClick={() => {
                            this.setState({edit: false})
                        }}>Cancel</button>
                      </span>
                    }
                </div>
                <div className="post-details">
                    <span>
                      submitted <Timestamp time={post.timestamp}/> by 
                      <a>{post.author}</a> to 
                      <a href={`/${post.category}`}> {post.category}</a>
                    </span>
                    <vr style={{fontSize: "initial", margin: "0 5px"}}/>
                    <span style={{fontWeight: "bold", color: "#424242"}}>
                      <a onClick={() => {
                        this.setState({newTitle: this.props.details.post.title})
                        this.setState({edit: true})
                      }}>edit</a>
                    </span>
                    <vr style={{fontSize: "initial", margin: "0 5px"}}/>
                    <span style={{fontWeight: "bold", color: "#424242"}}>
                      <a onClick={() => (this.setState({open: true}))}>delete</a>
                    </span>
                </div>
                <div>
                  <div className="post-body">
                    {!this.state.editBody && <span>{post.body}</span>}
                    {this.state.editBody && 
                      <span>
                        <textarea 
                          rows="4" 
                          cols="70"
                          value={this.state.newBody}
                          onChange={(e) => (this.setState({newBody: e.target.value}))} />
                        <br />
                        <button onClick={() => {this.updatePost()}}>Update</button>
                        <button onClick={() => {
                            this.setState({editBody: false})
                        }}>Cancel</button>
                      </span>
                    }
                  </div>
                  <span style={{fontSize: "smaller", fontWeight: "bold", color: "#424242"}}>
                    <button onClick={() => {
                      this.setState({newBody: this.props.details.post.body})
                      this.setState({editBody: true})
                    }}>edit</button>
                  </span>
                </div>
            </div>
          </div>

          <div className="comments">
            <div>Showing {comments.length} 
              {comments.length !== 1 && <span> comments</span>}
              {comments.length === 1 && <span> comment</span>}
            </div>
            <hr style={{margin:"0"}}/>

            <div style={{margin: "5px 0", fontSize: "0.95em"}}>
              Sorted by <Sort sort={sortBy} changeSort={this.changeCommentsSort}/>
            </div>

            <div>
              <textarea 
                className="comment-input" 
                rows="8" 
                cols="75"
                value={this.state.newComment}
                onChange = {(e) => this.setState({newComment: e.target.value})} />
              <br />
              <RaisedButton 
                label="Submit" 
                primary={true}
                onClick={() => this.updateComment()}/>
              <span style={{fontSize: "smaller", marginLeft: "1em"}}>
              {this.state.submitted && <span>Submitted</span>}
              {this.state.emptyComment && 
                <span style={{color: "red"}}>
                  Need something to submit
                </span>}
              </span>
            </div>

            {comments.map(comment => (
              <div key={`${comment.id}`}>
                {!comment.deleted && 
                  <div className="comment-container">
                    <Comment post={comment} />
                  </div>
                }
              </div>
            ))}
          </div>
          <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}>
              Are you sure you want to delete this post?
          </Dialog>
        </div>
      )
    }
}

function mapStateToProps ({ details }) {
  return {
    details,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    fetchPost: (id) => dispatch(fetchPost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
    deletePost: (id) => dispatch(deletePost(id)),
    changeCommentsSort: (sort) => dispatch(changeCommentsSort(sort)),
    postComment: (comment) => dispatch(postComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)