import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import SubReadable from './SubReadable';
import * as API from '../API.js';

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

        <Route path="/react" render={() => (
          <SubReadable title = "react" />
        )} /> 

        <Route path="/redux" render={() => (
          <SubReadable title = "redux" />
        )} />

        <Route path="/udacity" render={() => (
          <SubReadable title = "udacity" />
        )} />        

      </div>
    );
  }
}

export default App;
