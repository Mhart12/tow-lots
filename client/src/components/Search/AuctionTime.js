import React from 'react';
import moment from 'moment';

export default class AuctionTime extends React.Component {
  render() {

    let currentYear = moment().year();
    let currentMonth = moment().month()

    const getThirdTuesday = (year, month) => {
      let myMonth = moment({year: year, month: month});
      let thirdTuesday = myMonth.weekday(2);
      let nWeeks = 2;

      if (thirdTuesday.month() !== month) nWeeks++;

      return thirdTuesday.add(nWeeks, 'weeks').format("MMMM DD YYYY");
    }

    return (
      <div style = {{textAlign: 'center', padding: 10, fontWeight: 'bold'}}>
        Next Auction: {getThirdTuesday(currentYear, currentMonth)}
      </div>
    );
  }
}
