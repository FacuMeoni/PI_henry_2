require('dotenv').config();
const axios = require('axios');
const { API_URL, API_KEY } = process.env;
const { Temperament } = require('../db');

const getAPITemperaments = async() =>{
    try {
        const { data } = await axios(`${API_URL}?api_key=${API_KEY}`);
    
        
        const temps = await Promise.all(data.map(async(dog) => {
        return {
            name: dog.temperament
         }}));

        
    } catch (error) {
            throw new Error(error.message);
    }
} 


const getDBtemperaments = async() => {
    try {
        const temperaments = Temperament.findAll();
        
        return temperaments;      
    } catch (error) {
        throw new Error(error.message);
    }
}



const getAllTemperaments = async() => {
    try {
        const DBtemperaments = await getDBtemperaments();
        const APItemperaments = await getAPITemperaments();

        const allTemperaments = APItemperaments.concat(DBtemperaments);

        return allTemperaments;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getAllTemperaments;