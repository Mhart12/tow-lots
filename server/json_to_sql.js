const axios = require('axios');
const mysql = require('mysql');
// take tow lots json and insert into local sql table
axios.get('https://data.kcmo.org/resource/xpwx-fzzw.json')
  .then(function (response) {
    for(let i in response.data) {
      let query = 'INSERT INTO current_vehicles(vehicle_id, year, make, model, reason, tow_reference, vin, lot, k, comments, front_pic, back_pic) VALUES ?';
      let values = [
        [
          response.data[i].vehicle_id,
          response.data[i].year,
          response.data[i].make,
          response.data[i].model,
          response.data[i].reason,
          response.data[i].tow_reference,
          response.data[i].vin,
          response.data[i].lot,
          response.data[i].k,
          response.data[i].comments,
          'frontURL',
          'backURL'
        ]
      ]
      connection.query(query, [values], function (error, results, fields) {
          if (error) throw error;
            console.log(`Row added!`);
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
