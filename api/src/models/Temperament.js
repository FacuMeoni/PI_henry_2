const { DataTypes } = require('sequelize')

module.exports = async(sequelize) => {
    sequelize.define('Temperament', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })
}