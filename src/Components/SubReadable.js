import React, { Component } from 'react';
import Post from './Post';
import Loading from './Utils/Loading';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions'

class SubReadable extends Component {

    componentWillMount(){
        if(this.props.title === "All"){
            this.props.fetchPosts();
        }
        else {
            this.props.fetchPosts(this.props.title)
        }
    }

    render() {
        const { title, site } = this.props;
        const posts = site.posts;
        return (
            <div>
                {site.loading && (
                    <Loading />
                )}
                {!site.loading && (
                    <div>
                        <div>Welcome to {title}</div>
                        <div>
                            {posts.map(post => (
                                <Post key={post.id} post={post}/>
                            ))}

                            {posts.length ===0 && (
                                <div className="no-posts">No posts here</div>
                            )}
                        </div>
                    </div>
                )}                
                
            </div>
        )
    }
}


function mapStateToProps ({ site }) {
  return {
    site
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubReadable)