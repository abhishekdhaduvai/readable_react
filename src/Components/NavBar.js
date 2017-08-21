import React from 'react';
import AppBar from 'material-ui/AppBar';

class NavBar extends React.Component {
  render(){
    return (
      <AppBar
        title="Readable"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onClick={() => this.props.handleToggle()}/>
    )
  }
}

export default NavBar;