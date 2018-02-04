import React from 'react';

import classes from './VehicleCell.css';

const vehicleCell = (props) => (
    <div className = {classes.vehicleCell}>
        <h4> {props.year} {props.make} {props.model} </h4>
        <p> VIN: {props.vin} </p>
        <p> Lot: {props.lot} </p>
        <p> Reason: {props.reason} </p>
        <p> Tow Reference: {props.tow_reference} </p>
        <p> Vehicle ID: {props.vehicle_id} </p>  
        <p> Keys: {props.k} </p>
        <p> Comments: {props.comments} </p>
    </div>
);

export default vehicleCell;