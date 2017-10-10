import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import SubReadable from './SubReadable';
import NewPost from './NewPost';
import PostDetails from './PostDetails';
import * as API from '../API.js';

import { connect } from 'react-redux';

class App extends Component {

  state = {
    categories: [{"name":"test", "path":"test"}],
    posts: []
  }

  componentDidMount(){
    API.getCategories().then(categories => {
      this.setState({categories});
    });
  }

  render() {
    const {categories} = this.state;

    return (
      <div className="App">

        <NavBarDrawer categories={categories}/>

        <Route exact path="/" render={() => (
          <SubReadable />
        )} />

        <Route exact path="/:category" render={() => (
          <SubReadable />
        )} /> 

        <Route exact path="/comments/:id" render={() => (
          <PostDetails />
        )} />

        <Route exact path="/create/new-post" render={() => (
          <NewPost />
        )} /> 

        <Route exact path="/create/new-sub" render={() => (
          <NewPost />
        )} />     

      </div>
    );
  }
}

function mapStateToProps ({ selectedSub }) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
)(App)
