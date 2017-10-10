import React, { Component } from 'react';
import PropTypes from 'prop-types';
import notVoted from './Utils/icons/not-voted.png';
import vote from './Utils/icons/voted.png';

import { connect } from 'react-redux';
import { upVote, downVote } from '../actions'

class Votes extends Component {

    state = {
        voted: "",
        upvoteIcon: notVoted,
        downvoteIcon: notVoted
    }

    toggleUpvote = () => {
        if(this.state.upvoteIcon === notVoted){
            this.setState({upvoteIcon: vote});
            this.setState({downvoteIcon: notVoted});
        }
        else
            this.setState({upvoteIcon: notVoted})
    }

    toggleDownVote = () => {
        if(this.state.downvoteIcon === notVoted){
            this.setState({downvoteIcon: vote});
            this.setState({upvoteIcon: notVoted});
        }
        else
            this.setState({downvoteIcon: notVoted})
    }

    upVote = (id) => {
        if(this.state.voted === ""){
            this.setState({voted: "upVoted"})
            this.props.upVote(id);
            this.props.post.voteScore++;
            this.toggleUpvote();
        }
        else if (this.state.voted === "downVoted"){
            this.setState({voted: "upVoted"})
            this.props.upVote(id);
            this.props.upVote(id);
            this.props.post.voteScore++;
            this.props.post.voteScore++;
            this.toggleUpvote();
        }
        else if (this.state.voted === "upVoted") {
            this.setState({voted: ""})
            this.props.downVote(id);
            this.props.post.voteScore--;
            this.toggleUpvote();
        }
    }

    downVote = (id) => {
        if(this.state.voted === ""){
            this.setState({voted: "downVoted"})
            this.props.downVote(id);
            this.props.post.voteScore--;
            this.toggleDownVote();
        }
        else if(this.state.voted === "upVoted"){
            this.setState({voted: "downVoted"})
            this.props.downVote(id);
            this.props.downVote(id);
            this.props.post.voteScore--;
            this.props.post.voteScore--;
            this.toggleDownVote();
        }
        else if(this.state.voted === "downVoted"){
            this.setState({voted: ""})
            this.props.upVote(id);
            this.props.post.voteScore++;
            this.toggleDownVote();
        }
    }

    render() {
        const {post} = this.props;
        return (
            <div className="votes">
                <div className="voteButton">
                    <img 
                        src={this.state.upvoteIcon} 
                        width="20px"
                        height="45px"
                        alt="Up"
                        className="upvote"
                        onClick={() => this.upVote(post.id)}/>
                </div>
                <div className="voteScore">{post.voteScore}</div>
                <div className="voteButton">
                    <img 
                        src={this.state.downvoteIcon} 
                        width="20px"
                        height="45px"
                        alt="Dn"
                        className="downvote"
                        onClick={() => this.downVote(post.id)}/>
                </div> 
            </div>
        )
    }
}

function mapStateToProps ({site}) {
  return {
      site
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
)(Votes)