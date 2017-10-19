import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import SubReadable from './SubReadable';
import NewPost from './NewPost';
import PostDetails from './PostDetails';

import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class App extends Component {

  componentDidMount(){
    this.props.fetchCategories();
  }

  render() {
    const {categories} = this.props.site;

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

      </div>
    );
  }
}

function mapStateToProps ({ site }) {
  return {
    site
  }
}

function mapDispatchToProps (dispatch){
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
