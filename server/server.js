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

connection.connect();

// table that will store all vehicles that are currently on the lot (updated once a month)
let create_current_vehicles_table = "CREATE TABLE IF NOT EXISTS current_vehicles (vehicle_id varchar(255) PRIMARY KEY,year varchar(255),make varchar(255),model varchar(255),reason varchar(255),tow_reference varchar(255),vin varchar(255), lot varchar(255), k varchar(255), comments varchar(255), front_pic varchar(255), back_pic varchar(255))";
connection.query(create_current_vehicles_table, function (error, results, fields) {
    if (error) throw error;
});

// table that will store vehicle ids and the user_id of the user who selected it
let create_saved_vehicles_table = "CREATE TABLE IF NOT EXISTS saved_vehicles (vehicle_id char(255), user_id int)";
connection.query(create_saved_vehicles_table, function (error, results, fields) {
    if (error) throw error;
});

// table will store users unique id, first and last name, email and password (not encrypted yet)
let create_users_table = "CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT PRIMARY KEY, first_name varchar(255), last_name varchar(255), email varchar(255), password varchar(255))";
connection.query(create_users_table, function (error, results, fields) {
    if (error) throw error;
});

// get request to display all vehicle data to front end
app.get('/current_vehicles', (req, res) => {
  connection.query('SELECT * FROM current_vehicles', (err, results) => {
    if(err) throw err;
      res.send(results)
  })
})

// only run this when new json and photos are avialable. Need some kind of if statement run
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
//           `https://s3.us-east-2.amazonaws.com/kctowlots/june_2018_front/${response.data[i].lot}_f.JPG`,
//           `https://s3.us-east-2.amazonaws.com/kctowlots/june_2018_back/${response.data[i].lot}_b.JPG`
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
//   });

// saves vehicle_id and user_id into saved_vehicles table. Prevents users from entering duplicates
app.post('/save_vehicle', (req, res) => {
  let query = "INSERT INTO saved_vehicles(vehicle_id, user_id) SELECT * FROM (SELECT ?, ?) AS temp WHERE NOT EXISTS (SELECT vehicle_id FROM saved_vehicles WHERE vehicle_id = ?) LIMIT 1";
  let values = [req.body.vehicle_id, 1, req.body.vehicle_id]
  query = mysql.format(query, values);
  connection.query(query, function (error, results, fields) {
      if (error) throw error;
        console.log(`Vehicle saved!`);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
