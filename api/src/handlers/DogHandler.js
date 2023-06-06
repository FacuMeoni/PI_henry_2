const express = require('express')
const router = express.Router();
const { getAllDogsDB, getByDogBreedName } = require('../controllers/DogController');


const getAllDogs = async(req,res) => {
    try {
        const allDogs =  await getAllDogsDB();
       
        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const getByBreedName = async(req,res) => {
    try {
        const { name } = req.query
        const dogBreeds = await getByDogBreedName(name)
        
        return res.status(200).json(dogBreeds)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}





module.exports = {
    getByBreedName,
    getAllDogs
}