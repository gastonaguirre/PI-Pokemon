const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,}
    },
    attack: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },
    defense: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },
    speed: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 1,
        max: 100,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
       defaultValue: 'https://cutt.ly/NVbECPH'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },{ timestamps: false });
};
