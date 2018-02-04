import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 

import classes from './App.css'
import VehicleCell from './components/VehicleCell/VehicleCell'
import SearchFunctions from './components/SearchFunctions/SearchFunctions'
import SearchButton from './components/SearchFunctions/SearchButton/SearchButton'
import Toolbar from './components/Toolbar/Toolbar'

// global variables assigned based on drop down selections
let dropDownYear = ""
let dropDownMake = ""
let dropDownReason = ""
let dropDownKey = ""
let dropDownModel = ""

// when drop menu item is clicked, assign variable to be used later
$(function() {
  $("#makeDropDown").on("change",function() {
    dropDownMake = this.value;
  });
});

$(function() {
  $("#keyDropDown").on("change",function() {
    dropDownKey = this.value;
  });
});

$(function() {
  $("#yearDropDown").on("change",function() {
    dropDownYear = this.value;
  });
});

$(function() {
  $("#reasonDropDown").on("change",function() {
    dropDownReason = this.value;
  });
});

$(function() {
  $("#modelDropDown").on("change",function() {
    dropDownModel = this.value;
  });
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // when search button is clicked, it will rerender the render component below
  handleClick() {
    this.setState({
      clicked: true,
    });
  }
  
  // get request to get JSON data
  componentDidMount(){
    axios
      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
      .then(({data})=> {
        this.setState({ 
          data: data,
        });
      }).catch((err)=> {})
  }
   
  render() {

    // iterate through JSON data and set variables 
    const child = this.state.data.map((el, index) => {

      let keys
      if (el.k === undefined) keys = "NO"
      if (el.k === " ") keys = "NO"
      if (el.k === "K") keys = "YES"

      let comments = el.comments;
      if (comments === undefined) comments = ""
  
      let year = el.year,
      make = el.make,
      model = el.model,
      reason = el.reason,
      lot = el.lot,
      towReference = el.tow_reference,
      vehicleID = el.vehicle_id,
      vin = el.vin,

      displayVehicleCell =
      <VehicleCell 
                key= {vehicleID} 
                year = {year} 
                make = {make} 
                vin = {vin}
                model = {model} 
                reason = {reason}
                lot = {lot} 
                tow_reference = {towReference}
                vehicle_id = {vehicleID}
                k = {keys}
                comment = {comments} />

      // search by only year
      if (year === dropDownYear && dropDownMake === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> )
      }
      // search by only make
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div>)  
      }
      // search only by keys
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search only by reason
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by only make and model
      else if (make === dropDownMake && dropDownYear === "" && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by only make and year
      else if (make === dropDownMake && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by only year and keys
      else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div>) 
      }
      // search by only year and reason
      else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by make and reason
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by make and keys
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by keys and reason
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && reason === dropDownReason) {
        return ( <div> {displayVehicleCell} </div> ) 
      }
      // search by year make model
      else if (make === dropDownMake && year === dropDownYear && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
        return ( <div> {displayVehicleCell} </div> ) 
      } 
    })
  
    // data that gets passed to index.js and is displayed
    return <div className ={classes.containerStyle}>
      <Toolbar />   
      <div className ={classes.searchDivStyle}>
        <SearchFunctions />
        <SearchButton onClick={this.handleClick} />
      </div>
      <div>{child}</div>
    </div>;
  }
}

export default App 

