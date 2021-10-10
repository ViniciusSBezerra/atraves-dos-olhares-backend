
const Admin = require('../database/models/admin');

const bcrypt = require("bcrypt");

module.exports = {

    async createAdmin(req, res) {
        let { name, email, password } = req.body;

        password = await bcrypt.hash(password, 8);

        try {

            await Admin.create({
                name,
                email,
                password
            })

            return res.status(201).json({ message: "Usuario cadastrado com sucesso!" });

        } catch (error) {
            return res.status(400).json({ message: error });
        }

    },

    async listAdmin(req, res) {

        try {
            const admin = await Admin.findAll({})

            return res.status(200).json({ admin })
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    async updateAdmin(req, res) {

        let { name, email, password } = req.body;
        const { id } = req.params;

        password = await bcrypt.hash(password, 8)

        try {
            await Admin.update({ name, email, password }, {
                where: { id }
            });

            return res.status(200).json({ message: "Admin alterado com sucesso!" });

        } catch (error) {
            return res.status(400).json({ message: error });
        }

    },

    async deleteAdmin(req, res) {
        const { id } = req.params;

        try {
            Admin.destroy({ where: { id } })

            return res.status(200).json({ message: "Admin deletado com sucesso!" });

        } catch (error) {
            return res.status(400).json({ message: error });
        }

    }
};