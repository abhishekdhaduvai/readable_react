import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Sort extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  changeSort = (sort) => {
      this.handleRequestClose();
      this.props.changeSort(sort);
  }

  render() {
    return (
      <span>

        <span 
            className="sort-dropdown"
            onTouchTap={this.handleTouchTap}>
            <i className="material-icons dropdown-content sort-text">{this.props.sort}</i>
        </span>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem 
                className="sort-menu-item"
                primaryText="Score"
                onClick={() => this.changeSort("Score")}/>
            <MenuItem 
                className="sort-menu-item"
                primaryText="New"
                onClick={() => this.changeSort("New")} />
            <MenuItem 
                className="sort-menu-item"
                primaryText="Controversial"
                onClick={() => this.changeSort("Controversial")} />
          </Menu>

        </Popover>
      </span>
    );
  }
}

export default Sort