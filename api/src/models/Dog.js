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
    },
    weight:{
     type:DataTypes.JSONB,
     allowNull:false 
    },
    height:{
      type:DataTypes.JSONB,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    origin:{
      type:DataTypes.STRING
    },
    createAtDB:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },
  {timestamps: false});
};
