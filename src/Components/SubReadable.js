import React, { Component } from 'react';
import Post from './Post';
import Sort from './Sort';
import Loading from './Utils/Loading';
import sortBy from 'sort-by';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

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
        const { posts } = site;
        
        if(site.sortBy === "Score"){
            posts.sort(sortBy('-voteScore'))
        }
        else if(site.sortBy === "Controversial"){
            posts.sort(sortBy('voteScore'))
        }
        else {
            posts.sort(sortBy('-timestamp'))
        }

        return (
            <div>
                {site.loading && (
                    <Loading />
                )}
                {!site.loading && (
                    <div>
                        <div className="welcome">
                            <span className="welcome-to-sub">Welcome to {title}</span>
                            <vr />
                            <span className="sort">Sort by <Sort /></span>
                        </div>
                        <div className="subreadable-content">
                            <div className="subreadable-main">
                                <div>
                                    {posts.map(post => (
                                        <Post key={post.id} post={post}/>
                                    ))}

                                    {posts.length ===0 && (
                                        <div className="no-posts">No posts here</div>
                                    )}
                                </div>
                            </div>
                            <div className="add-post">
                                <RaisedButton 
                                    label="Submit a new Post" 
                                    secondary={true}
                                    href="new-post"
                                    className="add-content-button" />
                                <RaisedButton 
                                    label="Create a new Sub" 
                                    secondary={true}
                                    href="new-post"
                                    className="add-content-button" />
                            </div>
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