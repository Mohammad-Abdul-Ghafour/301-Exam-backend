'use strict';

let axios = require('axios');

function getHandler(req, res) {
    axios.get('https://ltuc-asac-api.herokuapp.com/programmingLangData').then(data => {
        let programData = data.data.map(element => {
            return new Program(element)
        })
        res.send(programData);
    })
};

class Program {
    constructor(element) {
        this.id = element.id
        this.title = element.title
        this.dateCreated = element.dateCreated
        this.description = element.description
        this.imageUrl = element.imageUrl
    }
};

module.exports = getHandler;
