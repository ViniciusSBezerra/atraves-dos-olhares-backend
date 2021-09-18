

const Admin = require('../database/models/admin');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

module.exports = {

    async login(req, res) {

        let { email, password } = req.body;

        const admin = await Admin.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email
            }
        })

        if (admin === null) {
            return res.json({
                error: true,
                message: "Erro: Email ou senha incorretos!"
            })
        }


        if (!(await bcrypt.compare(password, admin.password))) {
            return res.json({
                error: true,
                message: "Erro: Email ou senha incorretos!"
            })
        }

        const token = jwt.sign({ id: admin.id }, process.env.KEY_JWT, {
            expiresIn: '7d'
        })

        return res.json({
            error: false,
            message: "Login realizado",
            token
        })



    }
}