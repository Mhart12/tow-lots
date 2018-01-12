


// API that can decode VIN number 
function decodeVIN (vin) {
	$.ajax({
		url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
		type: "POST",
		data: { format: "json", data: vin},
		dataType: "json",
		success: function(result)
		{
			 // console.log(result.Results[0].VehicleType + " " + vin)
		}
	})		
}

// API provided from KC Tow Lot 
$.ajax({
	url: "https://data.kcmo.org/resource/xpwx-fzzw.json",
	type: "GET",
	dataType: "json",
	success: function(result)
	{
		console.log(result)
		var temp;

		for (i = 0; i < result.length; i++) {

			var vin = result[i].vin
			decodeVIN(vin)
	
  			temp = document.createElement('div');
  			temp.className = 'col-sm-4';

  			var keys = result[i].k
  			keys == "K" ? keys = "Yes" : keys = "No"

  			var lot = result[i].lot
  			var year = result[i].year
  			year == undefined ? year = "" : year

  			// if (result[i].make == "FORD") 
  			var make = result[i].make
  			
  			var model = result[i].model
  			
  			var reason = result[i].reason
  			var tow_reference = result[i].tow_reference
  			var vehicle_id = result[i].vehicle_id

  			var all = year + " " + make + " " + model + "<br>" + "VIN: " + vin + "<br>" + "Keys: " + keys + "<br>" + "Lot# " + lot
  			+ "<br>" + "Reason For Sale: " + reason + "<br>" + "Tow Reference: " + tow_reference + "<br>" + "Vehicle ID: " + vehicle_id
  			
  			temp.innerHTML = all

  			document.getElementsByClassName('row')[0].appendChild(temp);
		}
	}
});	

