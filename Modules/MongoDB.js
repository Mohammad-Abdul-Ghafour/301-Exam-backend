'use strict';

const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    id: String,
    title: String,
    dateCreated: String,
    description: String,
    imageUrl: String,
    email: String
})

const programModel = mongoose.model('program', programSchema);

function findData(obj, res) {
    programModel.find(obj, function (error, data) {
        if (error) {
            console.log('error in finding data', error);
        } else {
            res.send(data)
        }
    })
}

function getDBHandler(req, res) {
    let { email } = req.query
    let data = findData({ email }, res)
}

function addHandler(req, res) {
    let { id, title, dateCreated, description, imageUrl, email } = req.body
    programModel.create({
        id,
        title,
        dateCreated,
        description,
        imageUrl,
        email
    }).then(() => {
        findData({ email }, res)
    })
}

function deleteHandler(req, res) {
    let { _id, email } = req.query
    programModel.deleteOne({
        _id
    }).then(() => {
        findData({ email }, res)
    })
}

function updateHandler(req, res) {
    let { _id, id, title, dateCreated, description, imageUrl,email } = req.body
    programModel.findByIdAndUpdate(_id, {
        id, title, dateCreated, description, imageUrl
    }).then(() => {
        findData({ email }, res)
    })
}

module.exports = { getDB: getDBHandler, addDB: addHandler, deleteDB: deleteHandler, updateDB: updateHandler }