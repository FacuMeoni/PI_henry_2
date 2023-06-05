require('dotenv').config();
const axios = require('axios');
const { Dog } = require('../db');
const { API_URL, API_KEY } = process.env;

// Hacer getDogs, get Dog By ID, getDog By Name, saveDBdog, create Dog.

const getApiData = async() => {
    try {
       const { data } = await axios(`${API_URL}?api_key=${API_KEY}`);
        

       const dogs = await Promise.all(
        data.map(async(dog) => {
            return {
                name: dog.name,
                image: dog.image.url,
                weight:{
                    imperial: dog.weight.imperial,
                    metric: dog.weight.metric
                },
                height:{
                    imperial: dog.height.imperial,
                    metric: dog.height.metric
                },
                life_span: dog.life_span,
                origin: dog.origin
            }
        })
       );

      return dogs;

    } catch (error) {
        throw new Error(error.message);
    }
}


const saveDogsDB = async() => {
    try {
        const allDogs = await getApiData();
  
        await Dog.bulkCreate(allDogs);

        console.log('Dogs Saved on db', allDogs.length);

    } catch (error) {
        throw new Error(error.message);
    }
}








module.exports = {
    saveDogsDB,
}