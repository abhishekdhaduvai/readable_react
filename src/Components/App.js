import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import SubReadable from './SubReadable';
import NewPost from './NewPost';
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
          <SubReadable title = "All" />
        )} />

        <Route exact path="/react" render={() => (
          <SubReadable title = "react" />
        )} />

        <Route exact path="/redux" render={() => (
          <SubReadable title = "redux" />
        )} />

        <Route exact path="/udacity" render={() => (
          <SubReadable title = "udacity" />
        )} />

        <Route exact path="/new-post" render={() => (
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
