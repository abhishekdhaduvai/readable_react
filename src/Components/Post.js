import React from 'react';
import Divider from 'material-ui/Divider';
import Timestamp from './Utils/Timestamp';

class Post extends React.Component{
    render() {
        const {post} = this.props;
        return (
            <div className="post">
                <div className="post-info">
                    <div className="post-title">{post.title}</div>
                    <div className="post-details">
                        submitted <Timestamp time={post.timestamp}/> by <a>{post.author}</a> to <a href={post.category}>{post.category}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;