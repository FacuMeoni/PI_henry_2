const express = require('express');
const router = express.Router();
const dogRoutes = require('./DogRoutes')
const loginRoutes = require('./LoginRoutes');


router.use('/login', loginRoutes);

router.use('/dogs', dogRoutes);

module.exports = router;
