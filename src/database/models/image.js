const sequelize = require('../connection');

const { DataTypes } = require('sequelize');


const Image = sequelize.define('Image', {

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



module.exports = Image;