import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavBar from './Utils/NavBar';
import Divider from 'material-ui/Divider';

class NavBarDrawer extends React.Component {

  PropTypes = {
    categories: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  handleClose = () => this.setState({open: false});

  render() {
    const {categories} = this.props;
    return (
      <div>

        <NavBar handleToggle={this.handleToggle}/>

        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>

            <div className="drawer-heading">
              <h2>Categories</h2>
            </div>
            <Divider />
            <MenuItem href="/">All</MenuItem>
            <Divider />
            
            {categories.map(category => (
              <div key={category.path}>
                <MenuItem href={`/${category.path}`}>{category.name}</MenuItem>
                <Divider />
              </div>
            ))}

        </Drawer>

      </div>
    );
  }
}

export default NavBarDrawer