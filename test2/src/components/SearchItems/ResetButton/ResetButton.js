import React from 'react'; 

import classes from './ResetButton.css'

class rearchButton extends React.Component {
  render() {
    return (
      <button className ={classes.ResetButton} {...this.props}>
        Search
      </button>
    );
  }  
}

export default rearchButton;