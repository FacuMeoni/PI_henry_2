const express = require('express')
const router = express.Router();
const { getAllDogs, getByName } = require('../controllers/DogController');


const getDogs = async(req,res) => {
    try {
        const allDogs =  await getAllDogs();
       
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const getDogByname = async(req,res) => {
    try {
        const name = req.query.name;

        const dog = await getByName(name);

        return res.status(200).json(dog);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}




module.exports = {
    getDogs,
    getDogByname
}