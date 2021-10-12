'use strict';

const express = require('express');
const server = express();
server.use(express.json());

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_DB}`);

const getHandler = require('./Modules/API')
const DB = require('./Modules/MongoDB');
const getDBHandler = DB.getDB;
const addHandler = DB.addDB;
const deleteHandler = DB.deleteDB;
const updateHandler = DB.updateDB;

// http://localhost:3001/home
server.get('/home', getHandler);

// http://localhost:3001/myfev?email=
server.get('/myfev', getDBHandler);

// http://localhost:3001/myfev
server.post('/myfev', addHandler);

// http://localhost:3001/myfev?_id=&email=
server.delete('/myfev', deleteHandler);

// http://localhost:3001/myfev
server.put('/myfev', updateHandler);

server.get('*', (req, res) => {
    res.status(404).send('error in getting data')
})

server.listen(PORT, () => {
    console.log('listening to the server');
});