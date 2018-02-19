import React from 'react';

import classes from './App.css'
import SearchItems from './components/SearchItems/SearchItems'
import Toolbar from './components/Toolbar/Toolbar'
import ShowResults from './components/ShowResults/ShowResults'
import AuctionInformation from './components/AuctionInformation/AuctionInformation'
import firebase from 'firebase';

class App extends React.Component {

  constructor(props){
    super(props)
    var config = {
      apiKey: "AIzaSyABwi8Vgx2B102P7_90y_2NqKj3i5v0AI4",
      authDomain: "kc-tow-lots.firebaseapp.com",
      databaseURL: "https://kc-tow-lots.firebaseio.com",
      projectId: "kc-tow-lots",
      storageBucket: "kc-tow-lots.appspot.com",
      messagingSenderId: "1023951778590"
    };
  firebase.initializeApp(config);
  }

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

