import React from 'react';

import classes from './VehicleCell.css';

class vehicleCell extends React.Component {
    constructor(props) {
        super(props);
        this.saveItem = this.saveItem.bind(this);
    }

    saveItem() {
        alert(`Saving ${this.props.year} ${this.props.make} ${this.props.model}`)
    }   

    render() {

        return (
            <div className = {classes.vehicleCell}>
                <div className = {classes.vehicleInformation}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h4> {this.props.year} {this.props.make} {this.props.model} </h4>
                                    <p> VIN: {this.props.vin} </p>
                                    <p> Lot: {this.props.lot} </p>
                                    <p> Reason: {this.props.reason} </p>
                                    <p> Tow Reference: {this.props.tow_reference} </p>
                                    <p> Vehicle ID: {this.props.vehicle_id} </p>  
                                    <p> Keys: {this.props.k} </p>
                                    <p> Comments: {this.props.comments} </p>
                                </td>
                                <td>
                                    <img alt = "vehiclePic" src="http://www.kia.com/content/dam/kwcms/au/en/images/category/Kia-Rio-small-car-hatch-red.png" />
                                </td>
                                <td>
                                    <button className = {classes.saveButton} onClick = {this.saveItem}> Save Vehicle </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default vehicleCell;