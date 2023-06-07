const express = require('express');
const router = express.Router();
const { loginHandler, registerHandler } = require('../handlers/LoginHandler');


router.get('/', loginHandler);

router.post('/register', registerHandler);



module.exports = router;