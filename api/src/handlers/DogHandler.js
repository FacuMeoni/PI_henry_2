const express = require('express')
const router = express.Router();
const { getAllDogs, getByName, getDogByID, createDog } = require('../controllers/DogController');


const getDogs = async(req,res) => {
    try {
        const allDogs =  await getAllDogs();
       
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const searchDogByName = async(req,res) => {
    try {
        const{ name } = req.query;

        const dog = await getByName(name);

        return res.status(200).json(dog);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}


const searchDogByID = async(req, res) => {
    try {
        const { id } = req.params;
        const dogFounded = await getDogByID(id);
        
        return res.status(200).json(dogFounded);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const postDog = async(req, res) => {
    try {
        const newDog = await createDog(req.body);

        return res.status(200).json(newDog);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}



module.exports = {
    getDogs,
    searchDogByName,
    searchDogByID,
    postDog
}