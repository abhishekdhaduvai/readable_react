import React from 'react';
import Timestamp from './Utils/Timestamp';

import { connect } from 'react-redux';
import { upVote, downVote } from '../actions'

class Post extends React.Component{

    state = {
        post: this.props.post,
        voted: ""
    }

    upVote = (id) => {
        if(this.state.voted === ""){
            this.setState(post => {
                this.state.post.voteScore++;
            });
            this.setState({voted: "upVoted"})
            this.props.upVote(id);
        }
        else if (this.state.voted === "downVoted"){
            this.setState(post => {
                this.state.post.voteScore = this.state.post.voteScore + 2;
            });
            this.setState({voted: "upVoted"})
            this.props.upVote(id);
            this.props.upVote(id);
        }
        else if (this.state.voted === "upVoted") {
            this.setState(post => {
                this.state.post.voteScore--;
            });
            this.setState({voted: ""})
            this.props.downVote(id);
        }
    }

    downVote = (id) => {
        if(this.state.voted === ""){
            this.setState(post => {
                this.state.post.voteScore--;
            });
            this.setState({voted: "downVoted"})
            this.props.downVote(id);
        }
        else if(this.state.voted === "upVoted"){
            this.setState(post => {
                this.state.post.voteScore = this.state.post.voteScore - 2;
            });
            this.setState({voted: "downVoted"})
            this.props.downVote(id);
            this.props.downVote(id);
        }
        else if(this.state.voted === "downVoted"){
            this.setState(post => {
                this.state.post.voteScore++;
            });
            this.setState({voted: ""})
            this.props.upVote(id);
        }
    }

    render() {
        const { post } = this.state;
        return (
            <div className="post">
                <div className="votes">
                    <div className="voteButton" onClick={() => this.upVote(post.id)}>Up</div>
                    <div className="voteScore">{post.voteScore}</div>
                    <div className="voteButton" onClick={() => this.downVote(post.id)}>Dn</div>
                </div>
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
                </div>
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
    upVote:(id) => dispatch(upVote(id)),
    downVote:(id) => dispatch(downVote(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)