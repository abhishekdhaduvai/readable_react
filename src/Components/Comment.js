import React, { Component } from 'react';
import notVoted from './Utils/icons/not-voted.png';
import vote from './Utils/icons/voted.png';
import Timestamp from './Utils/Timestamp';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, deleteComment, updateComment } from '../actions'

class Comment extends Component {

    state = {
        voted: "",
        upvoteIcon: notVoted,
        downvoteIcon: notVoted,
        open: false,
        comment: this.props.post.body,
        edit: false,
    }

    handleClose = (input) => {
        if(input === "Yes"){
            this.deleteComment()
        }
        this.setState({open: false});
    };

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
            this.props.upVoteComment(id);
            this.toggleUpvote();
        }
        else if (this.state.voted === "downVoted"){
            this.setState({voted: "upVoted"})
            this.props.upVoteComment(id);
            this.props.upVoteComment(id);
            this.toggleUpvote();
        }
        else if (this.state.voted === "upVoted") {
            this.setState({voted: ""})
            this.props.downVoteComment(id);
            this.toggleUpvote();
        }
    }

    downVote = (id) => {
        if(this.state.voted === ""){
            this.setState({voted: "downVoted"})
            this.props.downVoteComment(id);
            this.toggleDownVote();
        }
        else if(this.state.voted === "upVoted"){
            this.setState({voted: "downVoted"})
            this.props.downVoteComment(id);
            this.props.downVoteComment(id);
            this.toggleDownVote();
        }
        else if(this.state.voted === "downVoted"){
            this.setState({voted: ""})
            this.props.upVoteComment(id);
            this.toggleDownVote();
        }
    }

    deleteComment = () => {
        console.log("deleted ", this.props.post)
        this.props.deleteComment(this.props.post.id)
        window.location.reload()
    }

    updateComment = () => {
        let updatedComment = {
            id: this.props.post.id,
            body: this.state.comment,
            timestamp: Date.now()
        }
        this.props.updateComment(updatedComment)
        this.setState({edit:false})
    }

    render() {
        const {post} = this.props;
        const voteStyles = {
            minWidth: "0px",
            padding: "5px 0",
            display: "flex"
        }
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
        return (
            <div className="votes" style={voteStyles}>
                <div>
                    <div className="voteButton" style={{maxHeight: "15px"}}>
                        <img 
                            src={this.state.upvoteIcon} 
                            width="15px"
                            height="30px"
                            alt="Up"
                            className="upvote"
                            onClick={() => this.upVote(post.id)}/>
                    </div>
                    <div style={{overflow: "hidden", maxHeight: "20px"}}>
                        <img 
                            src={this.state.downvoteIcon} 
                            width="15px"
                            height="30px"
                            alt="Dn"
                            style={{position: "relative", bottom: "18px"}}
                            onClick={() => this.downVote(post.id)}/>
                    </div>
                </div> 
                
                <div style={{fontSize: "small", paddingTop: "5px", textAlign: "left"}}>
                    <div>
                        <span style={{fontFamily: "Verdana, Helvetica, sans-serif", fontWeight: "bold"}}>
                            {post.author}&nbsp; 
                        </span>
                        <span style={{fontWeight: "bold"}}>
                            {post.voteScore || 1} 
                            {post.voteScore === 1 && <span> point </span>} 
                            {post.voteScore !== 1 && <span> points </span>}
                        </span>
                        <span style={{color:"grey", fontSize:"smaller"}}>
                            <Timestamp time={post.timestamp}/>
                        </span>
                    </div>
                    <div style={{fontSize: "initial", marginTop: "5px"}}>
                        {!this.state.edit && 
                            <div>
                                <span>{post.body}</span>
                                <div style={{fontWeight: "bold", fontSize: "smaller",color: "grey", marginTop: "5px"}}>
                                    <a onClick={() => (this.setState({open: true}))}>delete</a>
                                    <span style={{margin: "0px 5px"}}/>
                                    <a onClick={() => (this.setState({edit: true}))}>edit</a>
                                </div>
                            </div>
                        }
                        {this.state.edit && 
                            <span>
                                <textarea 
                                    rows="4" 
                                    cols="50"
                                    value={this.state.comment}
                                    onChange = {e => (this.setState({comment: e.target.value}))} />
                                <br />
                                <button onClick={() => this.updateComment()}>Update</button>
                                <button onClick={() => this.setState({edit: false})}>Cancel</button>
                            </span>    
                        }
                    </div>
                </div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Are you sure you want to delete this comment?
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
    upVoteComment:(id) => dispatch(upVoteComment(id)),
    downVoteComment:(id) => dispatch(downVoteComment(id)),
    updateComment:(comment) => dispatch(updateComment(comment)),
    deleteComment:(id) => dispatch(deleteComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)