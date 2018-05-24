const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', // your username
  password : 'root', // your password
  database : 'mydb' // your mysql db
});

// table for users (id, firstName, lastName, email, password)

// **** TABLE THAT STORES ALL VEHICLE CURRENT VEHICLES INFOMATION LOT (CHANGES EACH MONTH) ****
// CREATE TABLE current_vehicles (
//     vehicle_id varchar(255) PRIMARY KEY,
//     year varchar(255),
//     make varchar(255),
//     model varchar(255),
//     reason varchar(255),
//     tow_reference varchar(255),
//     vin varchar(255),
//     lot varchar(255),
//     k varchar(255),
//     comments varchar(255),
//     front_pic varchar(255),
//     back_pic varchar(255)
// );

// *** Create tables that stores vehicle id that where bookmarked with the user id that saved it ***
// CREATE TABLE saved_vehicles (
// 	vehicle_id char(255),
//     user_id int
// );

// **** TAKE TOW LOTS JSON AND MOVE INTO LOCAL SQL DB ****
// axios.get('https://data.kcmo.org/resource/xpwx-fzzw.json')
//   .then(function (response) {
//     for(let i in response.data) {
//       let query = 'INSERT INTO current_vehicles(vehicle_id, year, make, model, reason, tow_reference, vin, lot, k, comments, front_pic, back_pic) VALUES ?';
//       let values = [
//         [
//           response.data[i].vehicle_id,
//           response.data[i].year,
//           response.data[i].make,
//           response.data[i].model,
//           response.data[i].reason,
//           response.data[i].tow_reference,
//           response.data[i].vin,
//           response.data[i].lot,
//           response.data[i].k,
//           response.data[i].comments,
//           'frontURL',
//           'backURL'
//         ]
//       ]
//       connection.query(query, [values], function (error, results, fields) {
//           if (error) throw error;
//             console.log(`Row added!`);
//       });
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });;

connection.connect();

app.post('/save_vehicle', (req, res) => {

  // query to see if vehicle_id is duplicate
  let check_query = 'SELECT vehicle_id FROM saved_vehicles GROUP BY vehicle_id, email HAVING ( COUNT(*) > 1 )'
  let check_values = [[req.body.vehicle_id, 1]]
  connection.query(check_query, [[check_values]], function (error, results, fields) {
    if (error == false) {
      // need to find right sql query to find duplicate
      console.log(`Duplicate. Cant Do That!`);
    } else {

      let success_query = 'INSERT INTO saved_vehicles(vehicle_id, user_id) VALUES ?';
      let success_values = [[req.body.vehicle_id, 1]]
      connection.query(success_query, [success_values], function (error, results, fields) {
          if (error) throw error;
            console.log(`Vehicle saved!`);
      });
    }
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
