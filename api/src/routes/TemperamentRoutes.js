const express = require('express')
const router = express.Router();
const getTemperaments = require('../handlers/TemperamentHandler');

router.get('/', getTemperaments);

module.exports = router;