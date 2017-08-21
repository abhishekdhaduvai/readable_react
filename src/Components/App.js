import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import * as API from '../API.js';

class App extends Component {

  state = {
    categories: [],
  }

  componentDidMount(){
    API.getCategories().then(response => {
      this.setState({categories: response});
    });
  }

  render() {
    return (
      <div className="App">
        <NavBarDrawer categories={this.state.categories}/>
        <Route exact path="/" render={() => (
          <h1>Hello World</h1>
        )} />
      </div>
    );
  }
}

export default App;
