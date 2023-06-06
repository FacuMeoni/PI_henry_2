const express = require('express');
const router = express.Router();
const { getByBreedName, getAllDogs } = require('../handlers/DogHandler'); 


router.get('/', getAllDogs);

router.get('/name', getByBreedName);



module.exports = router;