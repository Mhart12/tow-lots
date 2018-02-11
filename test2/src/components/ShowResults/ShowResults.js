import React from 'react';
import $ from 'jquery';
import axios from 'axios'; 

import classes from './ShowResults.css'
import VehicleCell from './VehicleCell/VehicleCell'
import SearchButton from '../SearchItems/SearchButton/SearchButton'

let dropDownYear = ""
let dropDownMake = ""
let dropDownReason = ""
let dropDownKey = ""
let dropDownModel = ""

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

class ShowResults extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      clicked: false,
    };
    this.displayItems = this.displayItems.bind(this);
  }

  componentDidMount(){
    axios
      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
      .then(({data})=> {
        this.setState({ 
          data: data,
        });
    }).catch((err)=> {})
  }

  displayItems() {
    this.setState({
      clicked: true,
    });
  }

	render() {

      let recordsLength = this.state.data.length;
      let arr = [];

      let child = this.state.data.map((el, index) => {

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
                  comment = {comments}
                  />

        // search by only year
        if (year === dropDownYear && dropDownMake === "" && dropDownKey === "" && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length
          return displayVehicleCell
        }
        // search by only make
        else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length
          return displayVehicleCell 
        }
        // search only by keys
        else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length         
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search only by reason
        else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by only make and model
        else if (make === dropDownMake && dropDownYear === "" && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by only make and year
        else if (make === dropDownMake && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by only year and keys
        else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div>) 
        }
        // search by only year and reason
        else if (dropDownMake === "" && year === dropDownYear && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by make and reason
        else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && dropDownKey === "" && reason === dropDownReason) {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by make and keys
        else if (make === dropDownMake && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by keys and reason
        else if (dropDownMake === "" && dropDownYear === "" && dropDownModel === "" && keys === dropDownKey && reason === dropDownReason) {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> ) 
        }
        // search by year make model
        else if (make === dropDownMake && year === dropDownYear && model === dropDownModel && dropDownKey === "" && dropDownReason === "") {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> )  
        } 
        // display all items when all search queries are blank  
        else if (dropDownYear === "" && dropDownMake === "" && dropDownKey === "" && dropDownReason === "")  {
          arr.push(el)
          recordsLength = arr.length          
          return ( <div> {displayVehicleCell} </div> )
        } 

        return null
      })

    return <div>
      <div className = {classes.ShowResults}>
        <SearchButton onClick={this.displayItems} />
      </div>  
      <div className = {classes.Records}> Displaying {recordsLength} records </div>
      <div> {child} </div>
    </div>;

	}
}

export default ShowResults