import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 

import classes from './App.css'
import SearchFunctions from './components/SearchFunctions/SearchFunctions'
import SearchButton from './components/SearchFunctions/SearchButton/SearchButton'
import Toolbar from './components/Toolbar/Toolbar'
import Auxiliary from './hoc/Auxiliary'

// JSX styling components need to move these into seperate css files
const containerStyle = {
    margin: 'auto',
    textAlign: 'center'
};

// JSX styling components need to move these into seperate css files
const childStyle = {
    margin: 'auto',
};

// JSX styling components need to move these into seperate css files
const pStyle = {
    margin: 0
}

// JSX styling components need to move these into seperate css files
const pStyleHead = {
    fontWeight: 'bold',
    margin: 0
}

// JSX styling components need to move these into seperate css files
const searchDivStyle = {
  backgroundColor: 'white',
  border: '2px solid #e6e6e6',
  margin: 'auto',
  width: '100%'
}

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
  
      let year = el.year
      let make = el.make
      let model = el.model
      let reason = el.reason
      let lot = el.lot
      let towReference = el.tow_reference
      let vehicleID = el.vehicle_id
      let vin = el.vin

      // JSX component that will displayed if statement is true
      let displayVehicleCell = 
      <Auxiliary> 
        <p style ={pStyleHead}> {year} {make} {model} </p>
        <p style ={pStyle}> VIN: {vin} </p>
        <p style ={pStyle}> Lot: {lot} </p>
        <p style ={pStyle}> Reason: {reason} </p>
        <p style ={pStyle}> Tow Reference: {towReference} </p>
        <p style ={pStyle}> Vehicle ID: {vehicleID} </p>  
        <p style ={pStyle}> Keys: {keys} </p>
        <p style ={pStyle}> Comments: {comments} </p>
      </Auxiliary> 

      /*
        Need to find a better to lay this out
        Long if else statement based on if drop items are equal to
        any of the iterated data
      */

      // search by only year
      if (year === dropDownYear && dropDownMake === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> )
      }
      // search by only make
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> )  
      }
      // search only by keys
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search only by reason
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by only make and model
      else if (make === dropDownMake && dropDownYear === "" && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by only make and year
      else if (make === dropDownMake && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by only year and keys
      else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by only year and reason
      else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by make and reason
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by make and keys
      else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by keys and reason
      else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && reason === dropDownReason) {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
      // search by year make model
      else if (make === dropDownMake && year === dropDownYear && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
        return ( <div key={index} className={classes.App}> {displayVehicleCell} </div> ) 
      }
    })
  
    // data that gets passed to index.js and is displayed
    return <div style ={containerStyle}>
      <Toolbar />   
      <div style ={searchDivStyle}>
        <SearchFunctions />
        <SearchButton onClick={this.handleClick} />
      </div>
      <div style ={childStyle}>{child}</div>
    </div>;
  }
}

export default App 

