require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_URL, API_KEY, API_IMAGE_URL } = process.env;

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
        
        // iteramos cada dog buscando el temperamento relacionado, convirtiendo los temperamentos en array, mapeandolos y encontrando o creando el temperamento utilizando FindOrCreate,  en la base de Datos, lo guardamos en una costante para 
        for (const dog of allDogs) {
            const dogTemperaments = await Promise.all(
              dog.temperament.split(',').map(async (temp) => {
                const [temperament] = await Temperament.findOrCreate({ where: { name: temp } });
                return temperament;
              })
            );
            const dbDog = await Dog.findOne({ where: { name: dog.name } });
      
            await dbDog.addTemperaments(dogTemperaments);
        }
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
                through: { attributes: [] }
            }
        })
        return allDogs;
    } catch (error) {
        
    }
}

const getBreedByNameOnDB = async(name) => {
    try {
        const dogFounded = await Dog.findAll({
            where:  { name },
            include : {
                model: Temperament,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });
        
        return dogFounded;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getImageAPI = async(id) => {
    try {
        const { data } = await axios(`${API_URL}?api_key=${API_KEY}`);

        const image = await Promise.all(data.find(async(img) => img.id === id));

        return image.url;

    } catch (error) {
        throw new Error(error.message);
    }
}



const getBreedByNameOnAPI = async(name) => {
    try {
        const response = await axios(`${API_URL}/search?q=${name}`);
        const dogFounded = response.data[0]; //accedo al primer objeto del array
        if(!dogFounded)throw new Error('NOT FOUND')// si no lo encuentra lanza error
       
    
        
        
        const imageID = dogFounded. reference_image_id;

        const image = await getImageAPI(imageID);

        const weight = {
            imperial: dogFounded.weight?.imperial, // Verifico si 'weight' está definido antes de acceder a 'imperial'
            metric: dogFounded.weight?.metric, // lo mismo para acceder a 'metric'
        };
    
        const height = {
            imperial: dogFounded.height?.imperial, // Verificar si 'height' está definido antes de acceder a 'imperial'
            metric: dogFounded.height?.metric, // lo mismo para acceder a 'metric'
        };


    
        
        return {
            name: dogFounded.name,
            image,
            weight,
            height,
            life_span: dogFounded.life_span,
            origin: dogFounded.origin,
            temperament: dogFounded.temperament
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


const  getByDogBreedName = async(name) => {
   try {
        const dogBreedDB = await getBreedByNameOnDB(name); 
        const dogBreedAPI =  await getBreedByNameOnAPI(name);
           
       
        if(!dogBreedDB.length && !dogBreedAPI.length )throw new Error('Breed not found') //  verificamos la longitud, en caso de estar vacias ambas throw error not found
        

        
        return dogBreedDB ||  dogBreedAPI;
   } catch (error) {
        throw new Error(error.message);
   }
}









module.exports = {
    saveDogsDB,
    getByDogBreedName,
    getAllDogsDB
}