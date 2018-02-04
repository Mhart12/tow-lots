import React from 'react'; 

import classes from './SearchButton.css'

class searchButton extends React.Component {
  render() {
    return (
      <button className ={classes.SearchButton} {...this.props}>
        Search
      </button>
    );
  }  
}

export default searchButton;