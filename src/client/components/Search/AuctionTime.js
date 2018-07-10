import React from 'react';
import moment from 'moment';

export default class AuctionTime extends React.Component {
    render() {

        const getThirdTuesday = (month, year) => {
            let d = new Date(year, month, 1),
                tuesdays = [];
                d.setDate(d.getDate() + (9 - d.getDay()) % 7)
            while (d.getMonth() === month) {
                tuesdays.push(new Date(d.getTime()));
                d.setDate(d.getDate() + 7);
            }
            return tuesdays;
        }
        var today = new Date(),
            theseTuesdays = getThirdTuesday(today.getMonth(), today.getFullYear()),
            next;

        theseTuesdays.some(function (tuesday, index) {
            if (index % 2 === 1 && tuesday > today) {
                next = tuesday;
                return true;
            }
            return false;
        });
        return
        <div style={{ textAlign: 'center', padding: 10, fontWeight: 'bold' }}>
            Next Auction: moment(next).format("MMMM DD YYYY");
        </div>
    }
}
