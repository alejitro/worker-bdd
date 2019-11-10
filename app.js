'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
var randomController = require('./app/controllers/worker.ctrl.js');
var mysql = require('mysql'); //CAMBIO:ADICIONAR DEPENDENCIA

const port = 8001;

const db = mysql.createConnection ({ //CAMBIO ADICONAR CONEXION A BD
  host: 'hangover.cxelmrn7jq89.eu-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin2019',
  database: 'hangover'
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/test', [randomController]);

app.use( function (req, res, next) {
    next();
});

app.listen(port, () => {
  console.log('Worker BDD listening on ' + port);
});
