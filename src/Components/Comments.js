import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostVotes from './Votes';
import CommentVotes from './Utils/CommentVotes';
import Timestamp from './Utils/Timestamp';
import Sort from './Sort';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { fetchComments, fetchPost, changeCommentsSort, postComment } from '../actions';

class Comments extends Component {

    PropTypes = {
      details: PropTypes.func.isRequired,
      fetchComments: PropTypes.func.isRequired,
      fetchPost: PropTypes.func.isRequired,
      changeCommentsSort: PropTypes.func.isRequired,
      postComment: PropTypes.func.isRequired
    }

    state = {
      newComment: "",
      emptyComment: false,
      submitted: false
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

    updateComment = (e) => {
      this.setState({newComment: e.target.value})
    }
    
    postComment(comment) {
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
            {post !== undefined && 
              <div>
                <div className="post" style={{boxShadow:"none", marginBottom:"0px"}}>
                  <PostVotes post={post} />
                  <div className="post-info">
                      <div className="post-title">
                          <a>{post.title}</a>
                      </div>
                      <div className="post-details">
                          submitted <Timestamp time={post.timestamp}/> by <a>{post.author}</a> to <a href={`/${post.category}`}>{post.category}</a>
                      </div>
                      <div className="post-body">
                        {post.body}
                      </div>
                  </div>
                </div>

                <div className="comments">
                  <div>Showing {comments.length} comments</div>
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
                      onChange = {(e) => (this.updateComment(e))} />
                    <br />
                    <RaisedButton 
                      label="Submit" 
                      primary={true}
                      onClick={() => this.postComment()}/>
                    <span style={{fontSize: "smaller", marginLeft: "1em"}}>
                    {this.state.submitted && <span>Submitted</span>}
                    {this.state.emptyComment && 
                      <span style={{color: "red"}}>
                        Need something to submit
                      </span>}
                    </span>
                  </div>

                  {comments.map(comment => (
                    <div key={`${comment.id}`} className="comment-container">
                        <CommentVotes post={comment} />
                    </div>
                  ))}
                </div>

            </div>
            }
          </div>
      )
    }
}

function mapStateToProps ({ details }) {
  return {
    details
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    fetchPost: (id) => dispatch(fetchPost(id)),
    changeCommentsSort: (sort) => dispatch(changeCommentsSort(sort)),
    postComment: (comment) => dispatch(postComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)