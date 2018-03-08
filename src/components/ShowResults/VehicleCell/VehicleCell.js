import React from 'react';

import $ from 'jquery';
// import firebase from 'firebase';

import classes from './VehicleCell.css';
import DecodeVIN from '../DecodeVIN/DecodeVIN'

class vehicleCell extends React.Component {
    constructor(props) {
        super(props);
        // this.saveItem = this.saveItem.bind(this);
        this.getVinInformation = this.getVinInformation.bind(this);
        this.getPhotos = this.getPhotos.bind(this)
        this.state = {
            vehicle: '',
            user: '',
            infoButton: 'More',
            showPopup: false,
            transmission: '',
            driveType: '',
            ABS: '',
            bodyClass: '',
            engineHP: '',
            vehicleType: '',
            doors: '',
            displacement: '',
            engineCylinders: '',
            engineConfig: '',
            fuelType: '',
            frontAirBag: '',
            length: '',
            weight: '',
            seatBelts: '',
        };
    }

    // saveItem() {
    //     let dbCon = firebase.database().ref('savedVehicles');
    //     dbCon.push({
    //         vehicle: this.props,
    //         user: '123'
    //     })
    //     this.setState({
    //         vehicle: '',
    //         user: ''
    //     });
    // }

    getPhotos() {
      alert('Open More Pictures')
    }

    getVinInformation () {

        let transmission, driveType, ABS, bodyClass, engineHP, vehicleType, doors, displacementCC,
            engineCylinders, engineConfig, fuelType, frontAirBag, length, weight, seatBelts

        $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
            async: false,
            type: "POST",
            data: { format: "json", data: this.props.vin},
            dataType: "json",
            success: function(result) {
                transmission = result.Results[0].TransmissionStyle
                driveType = result.Results[0].DriveType
                ABS = result.Results[0].ABS
                bodyClass = result.Results[0].BodyClass
                engineHP = result.Results[0].EngineHP
                vehicleType = result.Results[0].VehicleType
                doors = result.Results[0].Doors
                displacementCC = result.Results[0].DisplacementCC
                engineCylinders = result.Results[0].EngineCylinders
                engineConfig = result.Results[0].EngineConfiguration
                fuelType = result.Results[0].FuelTypePrimary
                frontAirBag = result.Results[0].AirBagLocFront
                length = result.Results[0].TrailerLength
                weight = result.Results[0].GVWR
                seatBelts = result.Results[0].SeatBeltsAll
            }
        })

        this.setState({
            showPopup: !this.state.showPopup,
            infoButton: this.state.showPopup ? 'More' : 'Less',
            transmission: transmission,
            driveType: driveType,
            ABS: ABS,
            bodyClass: bodyClass,
            engineHP: engineHP,
            vehicleType: vehicleType,
            doors: doors,
            displacementCC: displacementCC,
            engineCylinders: engineCylinders,
            engineConfig: engineConfig,
            fuelType: fuelType,
            frontAirBag: frontAirBag,
            length: length,
            weight: weight,
            seatBelts: seatBelts
        })
    }

    render() {
        return (
            <div className = {classes.vehicleCell}>
                <div className = {classes.vehicleInformation}>
                    <table>
                        <tbody>
                            <tr>
                                <td className = {classes.vehicleText}>
                                    <h4> {this.props.year} {this.props.make} {this.props.model} </h4>
                                    <p> VIN: {this.props.vin} </p>
                                    <p> Lot: {this.props.lot} </p>
                                    <p> Reason: {this.props.reason} </p>
                                    <p> Tow Reference: {this.props.tow_reference} </p>
                                    <p> Vehicle ID: {this.props.vehicle_id} </p>
                                    <p> Keys: {this.props.k} </p>
                                    <p> Comments: {this.props.comments} </p>
                                </td>
                                <td className = {classes.vehiclePicture}>
                                    <img
                                      alt = "vehiclePic"
                                      src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"
                                      onClick = {this.getPhotos}  />
                                </td>
                                <td>
                                    <button className = {classes.expandButton}
                                            onClick = {this.getVinInformation.bind(this)}> {this.state.infoButton} Vehicle Information </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    {this.state.showPopup ?
                        <DecodeVIN
                            transmission = {this.state.transmission}
                            driveType = {this.state.driveType}
                            ABS = {this.state.ABS}
                            bodyClass = {this.state.bodyClass}
                            engineHP = {this.state.engineHP}
                            vehicleType = {this.state.vehicleType}
                            doors = {this.state.doors}
                            displacementCC = {this.state.displacementCC}
                            engineCylinders = {this.state.engineCylinders}
                            engineConfig = {this.state.engineConfig}
                            fuelType = {this.state.fuelType}
                            frontAirBag = {this.state.frontAirBag}
                            length = {this.state.length}
                            weight = {this.state.weight}
                            seatBelts = {this.state.seatBelts}
                            closePopup = {this.getVinInformation.bind(this)}
                        /> : null
                    }
            </div>
        )
    }
}

export default vehicleCell;
