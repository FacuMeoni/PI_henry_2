const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue:'https://media.indiedb.com/cache/images/members/1/361/360683/thumb_620x2000/random_dog.jpg'
    },
    weight:{
     type:DataTypes.STRING,
     allowNull:false 
    },
    height:{
      type:DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    origin:{
      type:DataTypes.STRING,
      defaultValue: "Unknown"
    },
    createAtDB:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },
  {timestamps: false});
};
