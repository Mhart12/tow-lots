$(document).ready(function(){ 

  var dropValue;

  $(function() {
    $("#dropDown").on("change",function() {
      dropValue = this.value;
      showVehicles()
    });
  });

  function showVehicles () {

    $('.col-sm-2').remove()
    $('.col-sm-8').remove()

    $.ajax({
    	url: "https://data.kcmo.org/resource/xpwx-fzzw.json",
    	type: "GET",
    	dataType: "json",
    	success: function(result) {

    		var temp;
    		var temp2;
    		var temp3;

    		for (i = 0; i < result.length; i++) {

          if (result[i].make == dropValue) {
          // car information div
          temp = document.createElement('div');
          temp.className = 'col-sm-8';

          // first div
          temp2 = document.createElement('div');
          temp2.className = 'col-sm-2';

          // third div
          temp3 = document.createElement('div');
          temp3.className = 'col-sm-2';
       
          var vin = result[i].vin
          var keys = result[i].k
          keys == "K" ? keys = "Yes" : keys = "No"

          var lot = result[i].lot
          var year = result[i].year
          year == undefined ? year = "" : year

          var make = result[i].make
          var model = result[i].model
          var reason = result[i].reason
          var tow_reference = result[i].tow_reference
          var vehicle_id = result[i].vehicle_id

          var all = year + " " + make + " " + model + "<br>" + "VIN: " + vin + "<br>" + "Keys: " + keys + " ----- " + "Lot# " + lot
          + "<br>" + "Reason For Sale: " + reason + " ----- " + "Tow Reference: " + tow_reference + "<br>" + "Vehicle ID: " + vehicle_id

          temp.innerHTML = all 
          temp2.innerHTML;
          temp3.innerHTML;

          document.getElementsByClassName('row')[0].appendChild(temp2);
          document.getElementsByClassName('row')[0].appendChild(temp);
          document.getElementsByClassName('row')[0].appendChild(temp3);
          }
    		}
    	}
    });	
  }
})
