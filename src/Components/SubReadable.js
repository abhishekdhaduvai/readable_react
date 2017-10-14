import React, { Component } from 'react';
import Post from './Post';
import Sort from './Sort';
import Loading from './Utils/Loading';
import sortBy from 'sort-by';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { fetchPosts, changeSort } from '../actions';

class SubReadable extends Component {

    componentWillMount(){
        if(window.location.pathname === "/"){
            this.props.fetchPosts("/posts");
        }
        else {
            this.props.fetchPosts("/"+window.location.pathname.slice(1)+"/posts")
        }
    }

    changeSort = (sort) => {
        this.props.changeSort(sort);
    }

    render() {

        const { site } = this.props;
        const { posts } = site;
        const title = window.location.pathname.slice(1) ? window.location.pathname.slice(1) : "All"

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
                            <span className="sort">Sort by <Sort sort={site.sortBy} changeSort={this.changeSort}/></span>
                        </div>
                        <div className="subreadable-content">
                            <div className="subreadable-main">
                                <div>
                                    {posts.map(post => (
                                        <Post key={post.id} post={post}/>
                                    ))}

                                    {(posts.length === 0 || 
                                    posts.filter(post => post.deleted).length === posts.length) && (
                                        <div className="no-posts">No posts here</div>
                                    )}
                                </div>
                            </div>
                            <div className="add-post">
                                <RaisedButton 
                                    label="Submit a new Post" 
                                    secondary={true}
                                    href="create/new-post"
                                    className="add-content-button" />
                                {/* <RaisedButton 
                                    label="Create a new Sub" 
                                    secondary={true}
                                    href="create/new-sub"
                                    className="add-content-button" /> */}
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
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    changeSort: (sort) => dispatch(changeSort(sort))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubReadable)