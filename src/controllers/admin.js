
const Admin = require('../database/models/admin');

const bcrypt = require("bcrypt");

module.exports = {

    async createAdmin(req, res) {
        let { name, email, password } = req.body;

        password = await bcrypt.hash(password, 8);
        await Admin.create({
            name,
            email,
            password
        })
            .then(() => {
                return res.json({
                    error: false,
                    message: "Usuario cadastrado com sucesso!"
                })
            })

    },

    async listAdmin(req, res) {

        Admin.findAll({})
            .then((response) => {
                return res.json({
                    response
                })
            })
    },

    async updateAdmin(req, res) {

        let { name, email, password } = req.body;

        let id = req.params.id;

        password = await bcrypt.hash(password, 8)

        await Admin.update({ name, email, password }, {
            where: { id }
        }).then(() => {
            return res.json({
                error: false,
                message: "Usuario atualizado com sucesso!"
            });
        });

    },

    async deleteAdmin(req, res) {
        const id = req.params.id;

        Admin.destroy({ where: { id } }).then(() => {
            return res.json({
                error: false,
                message: "Usuario deletado com sucesso!"
            });
        });
    }
};