import React from 'react';

import classes from './App.css'
import SearchItems from './components/SearchItems/SearchItems'
import Toolbar from './components/Toolbar/Toolbar'
import ShowResults from './components/ShowResults/ShowResults'
import AuctionInformation from './components/AuctionInformation/AuctionInformation'

class App extends React.Component {
   
  render() {

    return <div className ={classes.containerStyle}>
      <Toolbar />
      <AuctionInformation />   
      <div className ={classes.searchDivStyle}>
        <SearchItems/>
      </div>
      <ShowResults />
    </div>;

  }
}

export default App 

