const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', // your username
  password : 'root', // your password
  database : 'mydb' // your mysql db
});

// CREATE TABLE saved_vehicles (
//     vehicle_id varchar(255) PRIMARY KEY,
//     year varchar(255),
//     make varchar(255),
//     model varchar(255),
//     reason varchar(255),
//     tow_reference varchar(255),
//     vin varchar(255),
//     lot varchar(255),
//     k varchar(255),
//     comments varchar(255)
// );

connection.connect();

app.post('/save_vehicle', (req, res) => {
  let q = 'INSERT INTO saved_vehicles(vehicle_id, make, year) VALUES ?';
  let values = [[req.body.vehicle_id, req.body.make, req.body.year]]
  connection.query(q, [values], function (error, results, fields) {
      if (error) throw error;
        console.log('Record Added');
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
