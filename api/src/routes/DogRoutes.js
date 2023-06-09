const express = require('express');
const router = express.Router();
const {  searchDogByName, getDogs, searchDogByID, postDog } = require('../handlers/DogHandler'); 


router.get('/', getDogs);

router.get('/name', searchDogByName);

router.get('/:id', searchDogByID);

router.post('/', postDog);



module.exports = router;