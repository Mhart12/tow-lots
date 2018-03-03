import React from 'react';
import $ from 'jquery';
import axios from 'axios'; 

import classes from './ShowResults.css'
import VehicleCell from './VehicleCell/VehicleCell'
import ResetButton from './ResetButton/ResetButton'
import SearchButton from '../SearchItems/SearchButton/SearchButton'
import Spinner from '../Spinner/Spinner'

let dropDownYearMax = 3000;
let dropDownYearMin = 0;
let dropDownMake = "";
let dropDownReason = "";
let dropDownKey = "";
let dropDownModel = "";

$(function() {
  $("#makeDropDown").on("change",function() {
    dropDownMake = this.value;
    if (dropDownMake === "") dropDownModel = ""
  });
});

$(function() {
  $("#keyDropDown").on("change",function() {
    dropDownKey = this.value;
  });
});

$(function() {
  $("#yearDropDownMax").on("change",function() {
    dropDownYearMax = this.value;
    if (dropDownYearMax === "") dropDownYearMax = 3000
    if (dropDownMake === "") {
      dropDownMake = ""
      dropDownModel = ""
    }
  });
});

$(function() {
  $("#yearDropDownMin").on("change",function() {
    dropDownYearMin = this.value;
    if (dropDownYearMin === "") dropDownYearMin = 0
      if (dropDownMake === "") {
      dropDownMake = ""
      dropDownModel = ""
    }
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

class ShowResults extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      clicked: false,
      loading: true
    };
    this.displayItems = this.displayItems.bind(this);
  }

  componentDidMount(){
    axios
      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
      .then(({data})=> {
        this.setState({ 
          data: data,
          loading: false
        });
    }).catch((err)=> {})
  }

  displayItems() {
    this.setState({
      clicked: true,
    });
  }

  resetSearch() {
    window.location.reload()
  }

	render() {
 
      let itemsFoundArr = [];
      let errorMessage = ''
      let recordsLength;
      let child;
      
      if (this.state.loading) {
        child = <Spinner />
        recordsLength = 'Loading...'
      } else {       
        child = this.state.data.map((el, index) => {

          let keys
          if (el.k === undefined) keys = "NO"
          if (el.k === " ") keys = "NO"
          if (el.k === "K") keys = "YES"

          let comments = el.comments
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
              comments = {comments} />

          // search for ONLY min year
          if (dropDownYearMin <= year && dropDownYearMax === 3000 && dropDownMake === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year 
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND keys
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === "" && dropDownModel === "" && dropDownKey === keys && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND reason
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === reason) {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search by max year AND make AND model
          else if (make === dropDownMake && year <= dropDownYearMax && dropDownYearMin === 0 && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)         
            return displayVehicleCell
          }
          // search ONLY by max year
          else if (year === dropDownYearMax && dropDownYearMin === 0 && dropDownMake === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search ONLY by make
          else if (make === dropDownMake && dropDownYearMin === 0 && dropDownModel === "" && dropDownKey === "" && dropDownReason === "" && dropDownYearMax === 3000 && dropDownYearMin === 0) {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search ONLY by keys
          else if (dropDownYearMax === 3000 && dropDownYearMin === 0 && dropDownMake === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
            itemsFoundArr.push(el)       
            return displayVehicleCell
          }
          // search ONLY by reason
          else if (dropDownMake === "" && dropDownYearMax === 3000 && dropDownYearMin === 0 && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
            itemsFoundArr.push(el)        
            return displayVehicleCell 
          }
          // search by make AND model
          else if (make === dropDownMake && dropDownYearMax === 3000 && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)         
            return displayVehicleCell
          }
          // search by make AND max year
          else if (make === dropDownMake && year === dropDownYearMax && dropDownYearMin === 0  && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)       
            return displayVehicleCell
          }
          // search by max year AND keys
          else if (dropDownMake === "" && year === dropDownYearMax && dropDownYearMin === 0 && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
            itemsFoundArr.push(el)        
            return displayVehicleCell
          }
          // search by max year AND reason
          else if (dropDownMake === "" && year === dropDownYearMax && dropDownYearMin === 0  && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
            itemsFoundArr.push(el)          
            return displayVehicleCell
          }
          // search by make AND reason
          else if (make === dropDownMake && dropDownYearMax === 3000 && dropDownYearMin === 0  && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
            itemsFoundArr.push(el)        
            return displayVehicleCell
          }
          // search by make AND keys
          else if (make === dropDownMake && dropDownYearMax === 3000 && dropDownYearMin === 0 && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
            itemsFoundArr.push(el)         
            return displayVehicleCell
          }
          // search by keys AND reason
          else if (dropDownMake === "" && dropDownYearMax === 3000 && dropDownYearMin === 0 && dropDownModel === "" && keys === dropDownKey && reason === dropDownReason) {
            itemsFoundArr.push(el)         
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND model
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === model && dropDownKey === "" && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND model AND keys
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === model && dropDownKey === keys && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND keys AND reason
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === "" && dropDownKey === keys && dropDownReason === reason) {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND keys
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === "" && dropDownKey === keys && dropDownReason === "") {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND model AND reason 
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === model && dropDownKey === "" && dropDownReason === reason) {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // search between max year AND min year AND make AND model AND reason AND keys
          else if (year >= dropDownYearMin && year <= dropDownYearMax && dropDownMake === make && dropDownModel === model && dropDownKey === keys && dropDownReason === reason) {
            itemsFoundArr.push(el)
            return displayVehicleCell
          }
          // display all items when all search queries are blank  
          else if (dropDownYearMax === 3000 && dropDownYearMin === 0 && dropDownMake === "" && dropDownKey === "" && dropDownReason === "")  {
            itemsFoundArr.push(el)      
            return displayVehicleCell
          }

          return null
        })
      }
 
    // if no items are pushed into the array from above if statements and child has rendered already.. show error message
    if (itemsFoundArr.length === 0 && child.length > 0) {
      errorMessage = 'No results found. Please change your search parameters and try again.'
    }

    // show how many items were found with current search query
    if (itemsFoundArr.length > 0) {
      recordsLength = `Displaying ${itemsFoundArr.length} records`
    } 

    return (
        <div>
          <div className = {classes.ShowResults}>
            <SearchButton onClick={this.displayItems} />
            <ResetButton onClick={this.resetSearch}/>
          </div>  
          <div className = {classes.Error}> {errorMessage} </div>
          <div className = {classes.Records}> {recordsLength} </div>
          <div> {child} </div>
        </div>
    )
	}
}

export default ShowResults