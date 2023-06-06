const express = require('express');
const router = express.Router();
const dogRoutes = require('./DogRoutes')

router.use('/dogs', dogRoutes);

module.exports = router;
