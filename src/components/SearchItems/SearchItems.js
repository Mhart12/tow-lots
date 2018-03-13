import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import classes from './SearchItems.css'

class searchFunctions extends React.Component {
	constructor() {
	    super();

	  	this.state = {
	      data: [],
	    };
	}

	//For selecting radio button checked
	handleRadioButton(value) {
  	this.setState({
    	value: value
  	});

		//console.log("Radiobutton selected: " + value)
	}


	componentWillMount(){
	    axios
	      .get('https://data.kcmo.org/resource/xpwx-fzzw.json')
	      .then(({data})=> {
	        this.setState({
	          data: data,
	        });
	    }).catch((err)=> {})
	}

	render() {

		let data = this.state.data

		let years = this.state.data.map((el, index) => { return el.year })
		let yearsArray = years.filter((el, index) => {
			return years.indexOf(el) === index;
		}).sort((a,b) => { return b-a })

		let makes = this.state.data.map((el, index) => { return el.make })
		let makesArray = makes.filter((el, index) => {
			return makes.indexOf(el) === index;
		})
		makesArray.sort((a, b) => {
		   if (b > a) return -1;
		    else if (b < a) return 1;
		    return 0;
		});

		const createDropDown = (id, arr) => {
			$(id).empty();
			$(id).append($('<option></option>').val("").html(""));
			$.each(arr, function(i, p) {
			    $(id).append($('<option></option>').val(p).html(p));
			});
		}

		createDropDown ('#yearDropDownMax', yearsArray)
		createDropDown ('#yearDropDownMin', yearsArray)
		createDropDown ('#makeDropDown', makesArray)

		let selectedMake = ""
		let selectedMaxYear = ""
		let selectedMinYear = ""

		$("#makeDropDown").on("change",function() {
  			selectedMake = this.value;
  			let modelsArray;

  			if (selectedMaxYear !== "" && selectedMinYear === "" ) {
  				modelsArray = data.filter((el, index) => {
				return el.make === selectedMake && el.year <= selectedMaxYear
				})
  			} else if (selectedMaxYear !== "" && selectedMinYear !== "") {
  				modelsArray = data.filter((el, index) => {
				return el.make === selectedMake && el.year <= selectedMaxYear && el.year >= selectedMinYear
				})
  			} else if (selectedMaxYear === "" && selectedMinYear !== "") {
  				modelsArray = data.filter((el, index) => {
				return el.make === selectedMake && el.year >= selectedMinYear
				})
  			} else {
  				modelsArray = data.filter((el, index) => {
				return el.make === selectedMake;
				})
  			}

			modelsArray = modelsArray.map((el, index) => {
				return el.model
			})

			modelsArray = modelsArray.filter((el, index) => {
				return modelsArray.indexOf(el) === index;
			}).sort((a, b) => {
				if (b > a) return -1;
				else if (b < a) return 1;
			    return 0;
			});

			createDropDown ('#modelDropDown', modelsArray)
  		});

		$("#yearDropDownMax").on("change",function() {
  			selectedMaxYear = this.value;
  			let makesArr;
  			if (selectedMinYear !== "" ) {
  				makesArr = data.filter((el, index) => {
				return el.year <= selectedMaxYear && el.year >= selectedMinYear
				})
  			} else {
  				makesArr = data.filter((el, index) => {
				return el.year <= selectedMaxYear
				})
  			}

			makesArr = makesArr.map((el, index) => {
				return el.make
			})
			makesArr = makesArr.filter((el, index) => {
				return makesArr.indexOf(el) === index;
			}).sort((a, b) => {
				if (b > a) return -1;
				else if (b < a) return 1;
				return 0;
			});
			createDropDown ('#makeDropDown', makesArr)

			if (selectedMaxYear === "" && selectedMinYear === "") {
				createDropDown ('#makeDropDown', makesArray)
			}
  		});


		// max year clicked and unclicked... model === blank?
		$("#yearDropDownMin").on("change",function() {
  			selectedMinYear = this.value;
  			let makesArr;
  			if (selectedMaxYear !== "" ) {
  				makesArr = data.filter((el, index) => {
				return el.year <= selectedMaxYear && el.year >= selectedMinYear
				})
  			} else {
  				makesArr = data.filter((el, index) => {
				return el.year >= selectedMinYear
				})
  			}
  			makesArr = makesArr.map((el, index) => {
				return el.make
			})
			makesArr = makesArr.filter(function(el, index) {
				return makesArr.indexOf(el) === index;
			}).sort(function (a, b) {
				if (b > a) return -1;
				else if (b < a) return 1;
				return 0;
			});
			createDropDown ('#makeDropDown', makesArr)

			if (selectedMinYear === "" && selectedMaxYear === "") {
				createDropDown ('#makeDropDown', makesArray)
			}
  		});

		return (
			<div className = {classes.SearchItems}>
				<table>
					<tbody>
						<tr>
						<td> Min Year </td>
							<td>
								<select id = "yearDropDownMin"> </select>
							</td>
							<td> Max Year </td>
							<td>
								<select id = "yearDropDownMax"> </select>
							</td>

							<td> Make </td>
							<td>
								<select id = "makeDropDown" style = {{width: '150px'}}> </select>
							</td>

							<td> Model </td>
							<td>
								<select id = "modelDropDown" style = {{width: '150px'}}> </select>
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
							<td> Keys</td>
							<td>
									{/*radio buttons for keys or no keys */}
									<div className="ui radio checkbox" >
							    	<label>
											{/*Need to see if same id can be used for yes and no radiobox
												or if they need to stay seperate
												We might want to change the 1 and 2 later*/}
							         <input type="radio"
											 				value="YES"
															id = "keyDropDown"
											 				checked={this.state.value === 1}
											 				onChange={() => this.handleRadioButton(1)}/>
							            Yes
							     	</label>
							    </div>
							    	<div className="radio">
							      	<label>
							        	<input type="radio"
															 value="NO"
															 id = "keyDropDown2"
															 checked={this.state.value === 2}
															 onChange={() => this.handleRadioButton(2)}/>
							            No
							        </label>
							    </div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default searchFunctions;
