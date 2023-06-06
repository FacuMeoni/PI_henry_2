require('dotenv').config();
const axios = require('axios');
const { API_URL, API_KEY } = process.env;
const { Temperament } = require('../db');

// get temperaments, todos de la API. y ahi guardalos en DB



const getApiData = async() =>{
    try {
        const { data } = await axios(`${API_URL}?api_key=${API_KEY}&limit=60`);
        
        const temperaments = await Promise.all(data.map(async(dog) => {
        return {
            name: dog.temperament
         }}));

        return temperaments;
    } catch (error) {
            throw new Error(error.message);
    }
} 


const saveTemperamentsOnDB = async() => {
    try {
        const allTemperaments = await getApiData();

        Temperament.bulkCreate(allTemperaments);

        console.log('Temperaments Saved on DB', allTemperaments.length);

    } catch (error) {
        throw new Error(error.message);
        
    }
}


module.exports = {
    saveTemperamentsOnDB,
}

