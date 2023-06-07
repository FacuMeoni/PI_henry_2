const { User } =  require('../db');
// login, register


const register = async(name, email, password) => {
    try {
        if(!name || !email || !password){
            let errorMessage = 'Por favor complete ';
            if(!email)errorMessage += ' email';
            if(!password)errorMessage += ' password';
            if(!name)errorMessage += ' name';
            throw new Error(errorMessage);
        }

        const newUser = await User.create({
            name, email, password
        });
        return `User ${newUser.name} creado con exito`;
    } catch (error) {
        throw new Error(error.message)
    }
}


const login = async(email, password) => {
    try {
        if(!email || !password){
            let errorMessage = 'Por favor complete ';
            if(!email)errorMessage += ' email';
            if(!password)errorMessage += ' password';
            throw new Error(errorMessage);
        }

        const userLogged = await User.findOne({
            where: { email }
        });
        if(!userLogged) throw new Error('Email incorrecto');
        
        if(userLogged.password !== password)throw new Error('Password incorrecta')

        return {
            access: true,
            userID: userLogged.id
        }

    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    login, 
    register
}
