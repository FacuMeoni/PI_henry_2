require('dotenv').config();
const axios = require('axios');
const { API_URL, API_KEY } = process.env;
const { Temperament } = require('../db');

const getAllTemperaments = async() =>{
    try {
        const { data } = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        
        await Promise.all(
        data
          .map((dog) => dog.temperament)
          .join()
          .split(',')
          .map((temp) => temp.trim())
          .filter((temp)=> temp.length > 0)
          .map((temp) => {
            Temperament.findOrCreate({
                where: { name : temp}
            })
          })
         );
    
    
        const temperaments = await Temperament.findAll();
    
        return temperaments;
        
    } catch (error) {
            throw new Error(error.message);
    }
} 


// hacemos un destructuring de data, luego resolvemos las promesas, hacemos un map para obtener cada temperamento, los unimos, y lo dividimos por , con un split. luego eliminamos los espacios, filtramos y nos quedamos con aquellos que la length sea mayor a 0, y por ultimo hacemos un map y utilizamos el metodo findOrCreate para encontrarlo o crearlo en nuestra DB.
//Buscamos todos en la DB y los retornamos.
module.exports = getAllTemperaments;