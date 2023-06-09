const { DataTypes } = require('sequelize')

module.exports = async(sequelize) => {
    sequelize.define('Temperament', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING
        }
    },
    {
      timestamps: false
    })
}
