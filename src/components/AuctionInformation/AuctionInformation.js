import React from 'react';

import classes from './AuctionInformation.css'

class AuctionInformation extends React.Component {

render() {

  let year = new Date().getFullYear()
  let month = new Date().getMonth();
  let day = new Date().getDay()

  const thirdTuesdayOfMonth = (day, n, date) => {
      let count = 0;
      let idate = new Date(date);
      idate.setDate(1);

      while ((count) < n) {
        idate.setDate(idate.getDate() + 1);
        if (idate.getDay() === day) {
          count++;
        }
      }
      return idate.toString()
  }

  const nextAuction = thirdTuesdayOfMonth(2, 3, new Date(year, month, day)).substring(0,16)

    return (
      <div className = {classes.nextAuction}>
        Next Auction: {nextAuction}
      </div>
    );
  }
}

export default AuctionInformation;
