import React from 'react';
import Timestamp from './Utils/Timestamp';

import { connect } from 'react-redux';
import {  } from '../actions'

class Post extends React.Component{
    render() {
        const { post } = this.props;
        return (
            <div className="post">
                <div className="votes">
                    <div className="voteButton">Up</div>
                    <div className="voteScore">{post.voteScore}</div>
                    <div className="voteButton">Dn</div>
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)