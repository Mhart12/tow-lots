import React from 'react';

import classes from './DecodeVIN.css';

import FaAngleDoubleUp from 'react-icons/lib/fa/angle-double-up'

class decodeVIN extends React.Component {

    render() {
	    return (
	      <div className= {classes.popup}>
	        <div className= {classes.popup_inner}>
		        <table>
	                    <tbody>
								<tr>
								    <td className = {classes.ID}> Transmission </td>
								    <td className = {classes.Info}> {this.props.transmission} </td> 
								    <td className = {classes.ID}> Displacement CC </td>
								    <td className = {classes.Info}> {this.props.displacementCC} </td> 
		        				</tr>
								<tr>
								    <td className = {classes.ID}> Drive Type </td>
								    <td className = {classes.Info}> {this.props.driveType} </td> 
								    <td className = {classes.ID}> Engine Cylinders </td>
								    <td className = {classes.Info}> {this.props.engineCylinders} </td> 
		        				</tr>
								<tr>
								    <td className = {classes.ID}> ABS </td>
								    <td className = {classes.Info}> {this.props.ABS} </td> 
								    <td className = {classes.ID}> Engine Configuration </td>
								    <td className = {classes.Info}> {this.props.engineConfig} </td> 
		        				</tr>
								<tr>
								    <td className = {classes.ID}> Body Class </td>
								    <td className = {classes.Info}> {this.props.bodyClass} </td> 
								    <td className = {classes.ID}> Front Air Bags </td>
								    <td className = {classes.Info}> {this.props.frontAirBag} </td>  
		        				</tr>
								<tr>
								    <td className = {classes.ID}> Horse Power </td>
								    <td className = {classes.Info}> {this.props.engineHP} </td> 
								    <td className = {classes.ID}> Length </td>
								    <td className = {classes.Info}> {this.props.length} </td> 
		        				</tr>
								<tr>
								    <td className = {classes.ID}> Vehicle Type </td>
								    <td className = {classes.Info}> {this.props.vehicleType} </td> 
									<td className = {classes.ID}> Gross Vehicle Weight </td>
								    <td className = {classes.Info}> {this.props.weight} </td> 
		        				</tr>
								<tr>
								    <td className = {classes.ID}> Doors </td>
								    <td className = {classes.Info}> {this.props.doors} </td> 
								    <td className = {classes.ID}> Seatbelts </td>
								    <td className = {classes.Info}> {this.props.seatBelts} </td> 
		        				</tr>				        			
		        		</tbody>
		        </table>
	        <button className = {classes.Hide} onClick={this.props.closePopup}> Hide <FaAngleDoubleUp /> </button>
	        </div>
	      </div>
    	);
    }
}

export default decodeVIN;  