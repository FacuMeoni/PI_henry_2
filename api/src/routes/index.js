const express = require('express');
const router = express.Router();
const dogRoutes = require('./DogRoutes')
const loginRoutes = require('./LoginRoutes');
const temperamentRoutes = require('./TemperamentRoutes')


router.use('/login', loginRoutes);

router.use('/dogs', dogRoutes);

router.use('/temperaments', temperamentRoutes);

module.exports = router;
