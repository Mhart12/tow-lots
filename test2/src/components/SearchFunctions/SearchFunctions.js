import React from 'react'; 
import axios from 'axios';
import $ from 'jquery'; 

import classes from './SearchFunctions.css'

// global variables to use in componentDidMount and render methods
let filteredYearsArray;
let filteredMakesArray;
let selectedMake;
let obj;

//JSX styling for model dropdown
const modelStyle = {
	width: '150px'
}

class searchFunctions extends React.Component {
	constructor(props) {
	    super(props);	

	  	this.state = {
	      data: [],
	    };
	}

	// get request for JSON data
	componentDidMount(){
	    axios
	      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
	      .then(({data})=> {
	        this.setState({ 
	          data: data,
	        });

	        // take json data and declare to global var above
	        obj = this.state.data

	        // create array of available years, remove duplicates, sort from big to small
		    let years = this.state.data.map((el, index) => { return el.year })
		    filteredYearsArray = years.filter(function(el, index) {
				return years.indexOf(el) === index;
			})
		    filteredYearsArray.sort((a,b) => {return b-a })

		    // create array of available makes, remove duplicates, sort alphabetically
			let makes = this.state.data.map((el, index) => { return el.make })
		    filteredMakesArray = makes.filter(function(el, index) {
				return makes.indexOf(el) === index;
			})
			filteredMakesArray.sort(function (a, b) {
		      if (b > a) return -1;
		      else if (b < a) return 1;
		      return 0;
		    });

	    }).catch((err)=> {})
	}

	render() {

		// append years to drop list 
		$('#yearDropDown').empty();
		$('#yearDropDown').append($('<option></option>').val("").html(""));
		$.each(filteredYearsArray, function(i, p) {
		    $('#yearDropDown').append($('<option></option>').val(p).html(p));
		});

		// append makes to drop list
		$('#makeDropDown').empty();
		$('#makeDropDown').append($('<option></option>').val("").html(""));
		$.each(filteredMakesArray, function(i, p) {
		    $('#makeDropDown').append($('<option></option>').val(p).html(p));
		});

		// when make is selected, show available models in model dropdown 
		$(function() {
    		$("#makeDropDown").on("change",function() {
      			selectedMake = this.value;

      			// find objects that are equal to selected make ie BMW, FORD
				let filterByMake = obj.filter((el, index) => {
					return el.make === selectedMake;
				})

				// return only the model names
				let modelsArray = filterByMake.map((el, index) => { 
					return el.model
				})

				// remove any duplicate model names
				modelsArray = modelsArray.filter(function(item, pos) {
					return modelsArray.indexOf(item) === pos;
				})

				// append to drop down list
				$('#modelDropDown').empty();
				$('#modelDropDown').append($('<option></option>').val("").html(""));
				$.each(modelsArray, function(i, p) {
				    $('#modelDropDown').append($('<option></option>').val(p).html(p));
				});
							
    		});
  		});

		return <div className = {classes.SearchFunctions}> 
			<table>
				<tr>
					<td> Year </td>
					<td>
						<select id = "yearDropDown"> </select>
					</td>	
					<td> Make </td>
					<td>
						<select id = "makeDropDown"> </select>
					</td>

					<td> Model </td>
					<td>
						<select id = "modelDropDown" style = {modelStyle} > </select>
					</td>	
					<td> Keys </td>
					<td>
						<select id = "keyDropDown">
							<option value= ""></option>
							<option value= "YES"> YES </option>
							<option value= "NO"> NO </option>
						</select>
					</td>
			
					<td> Reason </td>
					<td>
						<select id = 'reasonDropDown'>
							<option value= ''> </option>
							<option value= 'ABANDONED'> ABANDONED </option>
							<option value= 'ACCIDENT'> ACCIDENT </option>
							<option value= 'ARREST'> ARREST </option>
							<option value= 'ILLEGALLY PARKED'> ILLEGALLY PARKED</option>
							<option value= 'OTHER'> OTHER </option>
							<option value= 'STOLEN'> STOLEN </option>	
						</select>
					</td>
				</tr>				
			</table>
		</div>
	}
}

export default searchFunctions;