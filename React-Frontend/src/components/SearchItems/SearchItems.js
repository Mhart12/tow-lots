import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 

import classes from './SearchItems.css'

class searchFunctions extends React.Component {
	constructor() {
	    super();	

	  	this.state = {
	      data: [],
	      makes: [],
	      years: []
	    };
	}

	componentWillMount(){
	    axios
	      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
	      .then(({data})=> {
	        this.setState({ 
	          data: data,
	        });

	        // create array of available years, remove duplicates, sort from big to small
		    let years = this.state.data.map((el, index) => { return el.year })
		    let filteredYearsArray = years.filter(function(el, index) {
				return years.indexOf(el) === index;
			})
		    filteredYearsArray.sort((a,b) => {return b-a })

		    // create array of available makes, remove duplicates, sort alphabetically
			let makes = this.state.data.map((el, index) => { return el.make })
		    let filteredMakesArray = makes.filter(function(el, index) {
				return makes.indexOf(el) === index;
			})
			filteredMakesArray.sort(function (a, b) {
		      if (b > a) return -1;
		      else if (b < a) return 1;
		      return 0;
		    });

		    this.setState({
            	makes: filteredMakesArray,
            	years: filteredYearsArray,
        	})

	    }).catch((err)=> {})
	}

	render() {

		let json = this.state.data
		let makesArray = this.state.makes
		let yearsArray = this.state.years

		// append years to drop list 
		$('#yearDropDown').empty();
		$('#yearDropDown').append($('<option></option>').val("").html(""));
		$.each(yearsArray, function(i, p) {
		    $('#yearDropDown').append($('<option></option>').val(p).html(p));
		});

		// append makes to drop list
		$('#makeDropDown').empty();
		$('#makeDropDown').append($('<option></option>').val("").html(""));
		$.each(makesArray, function(i, p) {
		    $('#makeDropDown').append($('<option></option>').val(p).html(p));
		});

		// when make is selected, show available models in model dropdown
		$(function() {
    		$("#makeDropDown").on("change",function() {
      			let selectedMake = this.value;

      			// find objects that are equal to selected make ie BMW, FORD
				let filterByMake = json.filter((el, index) => {
					return el.make === selectedMake;
				})

				// return only the model names
				let modelsArray = filterByMake.map((el, index) => { 
					return el.model
				})

				// remove any duplicate model names
				modelsArray = modelsArray.filter(function(el, index) {
					return modelsArray.indexOf(el) === index;
				})

				// append to drop down list
				$('#modelDropDown').empty();
				$('#modelDropDown').append($('<option></option>').val("").html(""));
				$.each(modelsArray, function(i, p) {
				    $('#modelDropDown').append($('<option></option>').val(p).html(p));
				});			
    		});
  		});

		// when year is selected, show available makes in make dropdown 
		$(function() {
    		$("#yearDropDown").on("change",function() {
      			let selectedYear = this.value;

      			// find objects that are equal to selected year
				let filterByYear = json.filter((el, index) => {
					return el.year === selectedYear;
				})

				// return only the model names
				let yearsArr = filterByYear.map((el, index) => { 
					return el.make
				})

				// remove any duplicate model names
				yearsArr = yearsArr.filter(function(el, index) {
					return yearsArr.indexOf(el) === index;
				})

				// append to drop down list
				$('#makeDropDown').empty();
				$('#modelDropDown').empty();
				$('#makeDropDown').append($('<option></option>').val("").html(""));
				$.each(yearsArr, function(i, p) {
				    $('#makeDropDown').append($('<option></option>').val(p).html(p));
				});			
    		});
  		});

		return <div className = {classes.SearchItems}> 
			<table>
				<tbody>
					<tr>
						<td> Year </td>
						<td>
							<select id = "yearDropDown"> </select>
						</td>	
						<td> Make </td>
						<td>
							<select id = "makeDropDown" style = {{width: '150px'}}> </select>
						</td>

						<td> Model </td>
						<td>
							<select id = "modelDropDown" style = {{width: '150px'}}> </select>
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
				</tbody>				
			</table>
		</div>
	}
}

export default searchFunctions;
