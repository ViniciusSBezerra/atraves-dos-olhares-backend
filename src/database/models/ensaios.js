const sequelize = require('../connection');

const { DataTypes } = require('sequelize');

const Ensaios = sequelize.define('ensaios', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    size: {
        type: DataTypes.STRING,
        allowNull: false
    },

    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,

    }
});


module.exports = Ensaios;