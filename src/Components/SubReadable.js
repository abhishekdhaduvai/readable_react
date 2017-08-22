import React, { Component } from 'react';
import Post from './Post';
import * as API from '../API.js';

class SubReadable extends Component {

    state = {
        posts: []
    }

    componentDidMount(){
        if(this.props.title === "All"){
            API.getPosts().then(posts => (
                this.setState({posts})
            ))
        }
        else {
            API.getPostsByCategory(this.props.title).then(posts => (
                this.setState({posts})
            ))
        }
    }

    render() {
        const { posts } = this.state;
        return (
            <div>
                {posts.map(post => (
                    <Post key={post.id} post={post}/>
                ))}

                {posts.length ===0 && (
                    <div className="no-posts">No posts here</div>
                )}
            </div>
        )
    }
}

export default SubReadable;