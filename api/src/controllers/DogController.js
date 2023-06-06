require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_URL, API_KEY } = process.env;

// Hacer getDogs, get Dog By ID, getDog By Name, saveDBdog, create Dog.

const getApiData = async() => {
    try {
       const { data } = await axios(`${API_URL}?api_key=${API_KEY}&limit=60`);
        

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
                origin: dog.origin,
                temperament: dog.temperament
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

        const allTemperaments = await Temperament.findAll();

        for (const dog of allDogs) {
            const dogTemperaments = await Promise.all(
              dog.temperament.split(',').map(async (temp) => {
                const trimmedTemp = temp.trim();
                let temperamentFounded = allTemperaments.find((temperament) => temperament.name === trimmedTemp);
      
                if (!temperamentFounded) temperamentFounded = await Temperament.create({ name: trimmedTemp }); // Si el temperamento no existe, lo creamos y lo guardamos en la base de datos
      
                return temperamentFounded;
              })
            );
            const dbDog = await Dog.findOne({ where: { name: dog.name } });
      
            await dbDog.addTemperaments(dogTemperaments);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


// const getDogByName = async(name) => {
//     try {
        
//     } catch (error) {
        
//     }
// }







module.exports = {
    saveDogsDB,
}