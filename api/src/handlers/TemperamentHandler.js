const express = require('express')
const router = express.Router();
const getAllTemperaments = require('../controllers/TemperamentController');

const getTemperaments = async(req,res) => {
    try {
        const allTemperaments = await getAllTemperaments();

        return res.status(200).json(allTemperaments);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getTemperaments;