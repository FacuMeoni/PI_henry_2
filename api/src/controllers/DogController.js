require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_URL, API_KEY } = process.env;

// Hacer getDogs, get Dog By ID, getDog By Name, saveDBdog, create Dog.

const getApiData = async() => {
    try {
       const { data } = await axios(`${API_URL}?api_key=${API_KEY}`);

       const dogs = await Promise.all(
        data.map(async(dog) => {
            return {
                id:dog.id,
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
                temperament: dog.temperament,
                createAtDB:false
            }
        })
       );

      return dogs;

    } catch (error) {
        throw new Error(error.message);
    }
}


const getAllDogsDB = async() => {
    try {
        const allDogs = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
            }
        })
        return allDogs;
    } catch (error) {
        
    }
}


const getAllDogs = async() => {
    try {

        const dbDogs = await getAllDogsDB();
        const apiDogs = await getApiData();
        
        const allDogs = apiDogs.concat(dbDogs); // concatenamos los dos resultados y retornamos
        
        return allDogs;
    } catch (error) {
        throw new Error(error.message);
    }
}


const getByName = async(name) => {
    try {
        const allDogs = await getAllDogs();

        const dog = allDogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase()); // utilizamos la funcion que obtiene todos los perros, realizamos un find para buscar en minisculas en ambos casos.
        if(!dog)throw new Error('Breed not found');// en caso de no haber lanzamos error.

        return dog;
    } catch (error) {
        throw new Error(error.meesage);
    }
}


// const getDogByID = async(id, source) => {
//         try {
            
//         } catch (error) {
            
//         }
// }





module.exports = {
    getAllDogs,
    getByName
}