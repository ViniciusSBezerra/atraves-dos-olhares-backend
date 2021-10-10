
const sequelize = require('../connection');

const { DataTypes } = require('sequelize');

const Admin = sequelize.define('admin', {

    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement:  true,
        type: DataTypes.INTEGER
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


module.exports = Admin;
