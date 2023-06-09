require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_URL, API_KEY } = process.env;

// Hacer getDogs, get Dog By ID, getDog By Name, saveDBdog, create Dog.

const getApiData = async() => {
    try {
       const { data } = await axios(`${API_URL}?api_key=${API_KEY}`);
        
       
       const dogs = await Promise.all(
        data.map(async (dog) => {
          const temperaments = dog.temperament
            ? dog.temperament.split(",").map((t) => ({ name: t.trim() }))
            : [];
            // volvemos temperament un array que contenga cada temperamento dividido en objeto, sin espacios al principio ni final
  
          return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            weight: {
              imperial: dog.weight.imperial,
              metric: dog.weight.metric,
            },
            height: {
              imperial: dog.height.imperial,
              metric: dog.height.metric,
            },
            life_span: dog.life_span,
            origin: dog.origin,
            Temperaments: temperaments,
            createAtDB: false,
          };
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
                through : {
                    attributes: []
                }
            }
        }) // Obtenemos todos los perros de la DB, incluyendo el model Temperament
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

        const dog = allDogs.find((dog) => dog.name.toLowerCase().replace(/ /g, "")=== name.toLowerCase().replace(/ /g, "")); // utilizamos la funcion que obtiene todos los perros, realizamos un find para buscar en minisculas en ambos casos.
        if(!dog)throw new Error(`No se encontró la raza "${name}".`);// en caso de no haber lanzamos error.

        return dog;
    } catch (error) {
        throw new Error(error.meesage);
    }
}


const getDogByID = async(id) => {
    try {
        const allDogs = await getAllDogs();
        
        const dog = allDogs.find((dog) => dog.id.toString() === id);//find para encontrar el id identico, convertimos el id del perro to string, ya que soluciona la busqueda en caso de que sea para API o para DB.
        
        if(!dog)throw new Error(`No se encontró la raza con el ID "${id}".`);// en caso de no haber lanzamos error.

        return dog;
    } catch (error) {
        throw new Error(error.message);
    }
}

//name, image, weight, height, life_span, origin
const createDog = async({ name,image, height, weight, life_span, origin, temperament }) => {
    try {
        if(!name || !image || !height || !weight || !life_span || !origin || !temperament){
            let errorMessage = 'Por favor completar ';
            if(!name)errorMessage += 'name';
            if(!image)errorMessage += 'image';
            if(!height)errorMessage += 'height';
            if(!weight)errorMessage += 'weight';
            if(!life_span)errorMessage += 'life_span';
            if(!origin)errorMessage += 'origin';
            if(!temperament)errorMessage += 'temperament';
            throw new Error(errorMessage);
        }

        const newDog = await Dog.create({ name, image, height, weight, life_span, origin });

        const temperaments = Array.isArray(temperament) ? temperament : [temperament]; //verifico si es Array, si no lo convierto

        const temp = temperaments
        .join()// Unimos los elementos del array temperament con Join
        .split(',')//dividimos en un nuevo array por cada coma
        .map((temp) => temp.trim()) // eliminamos los espacios de delante y atras
        .filter((temp) => temp.length > 0) // filtramos e incluimos aquellos que tengan longitud mayor a 0
        .map((temp) => { //
            return Temperament.findOrCreate({
                where: { name: temp }
            })
                .then(([temp]) => temp); 
        }); //por cada temp realizamos la funcion findOrCreate de sequelize para verificar si existe o debemos crearlo en la base de datos utilizando el nombre. y por ultimo realizamos un .then para extraer el objeto temp.

        const tempResults = await Promise.all(temp);//resolvemos promesas

        await newDog.addTemperaments(tempResults);//relacion

        return `Dog ${newDog.name} creado con exito!`
    } catch (error) {
        throw new Error(error.message);
    }
}




module.exports = {
    getAllDogs,
    getByName,
    getDogByID,
    createDog
}