const { register, login } = require('../controllers/LoginController');

const registerHandler = async(req, res) => {
    try {
        const { name, email, password} = req.body;

        const newUser = await register(name, email, password);

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}


const loginHandler = async(req,res) => {
    try {
        const { email, password } = req.query;
        
        const userLogged = await login(email, password);

        return res.status(200).json(userLogged);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}



module.exports = {
    loginHandler,
    registerHandler
}