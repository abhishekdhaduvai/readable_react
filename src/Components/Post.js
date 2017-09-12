import React from 'react';
import Divider from 'material-ui/Divider';
import Timestamp from './Utils/Timestamp';
import Votes from './Votes';

class Post extends React.Component{
    render() {
        const {post} = this.props;
        console.log("posts ", post);
        return (
            <div className="post">
                <Votes score={post.voteScore} />
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

export default Post;