const express = require('express');
const router = express.Router();
const {  getDogByname, getDogs } = require('../handlers/DogHandler'); 


router.get('/', getDogs);

router.get('/name',  getDogByname);



module.exports = router;