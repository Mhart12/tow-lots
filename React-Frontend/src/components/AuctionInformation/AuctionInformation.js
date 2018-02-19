import React from 'react'; 

import classes from './AuctionInformation.css'

class AuctionInformation extends React.Component {

render() {

  var year = new Date().getFullYear()
  var month = new Date().getMonth();
  var day = new Date().getDay()

  function thirdTuesdayOfMonth(day, n, date) {                                                                                              
      var count = 0; 
      var idate = new Date(date);                                                                                                       

      idate.setDate(1);                                                                                                                 

      while ((count) < n) {                                                                                                             
        idate.setDate(idate.getDate() + 1);
        if (idate.getDay() === day) {
          count++;                                                                                                                      
        }                                                                                                                               
      }          

    return idate.toString()
  }

  var nextAuction = thirdTuesdayOfMonth(2, 3, new Date(year, month, day)).substring(0,16)

    return (
      <div className = {classes.nextAuction}>
        <p> Next Auction: {nextAuction} </p>
      </div>
    );
  }  
}

export default AuctionInformation;