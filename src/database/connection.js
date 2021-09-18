const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('upload_image', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then((response) => {
    console.log(response)
}).catch(err => {
    console.log(err)
})

module.exports = sequelize;