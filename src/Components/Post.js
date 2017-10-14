import React from 'react';
import PropTypes from 'prop-types';
import Votes from './Votes';
import Timestamp from './Utils/Timestamp';

class Post extends React.Component{

    PropTypes = {
        post: PropTypes.object.isRequired,
    }

    render() {
        const { post } = this.props;
        return (
            <div>
                {!post.deleted && (
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
                                <a href= {`comments/${post.id}`}><span>{post.comments}</span> comments</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Post