const { DataTypes } =  require('sequelize')

module.exports =  async(sequelize) => {
    sequelize.define('User', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique: true
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                is: /\d/
              }
        }
    })
}