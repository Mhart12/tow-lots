import React from 'react';

import classes from './ResetButton.css'

class resetButton extends React.Component {
  render() {
    return (
      <button className ={classes.ResetButton} {...this.props}>
        Reset
      </button>
    );
  }
}

export default resetButton;
