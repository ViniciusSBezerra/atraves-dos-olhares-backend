const Streetwear = require('../database/models/image');

const aws = require('aws-sdk');

module.exports = {

    async viewStreerwear(req, res) {

        const { id } = req.params;

        try {
            const streetwear = await Streetwear.findOne({ where: { id } })

            return res.status(200).json({ streetwear });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    },

    async uploadStreetwear(req, res) {
        const { originalname: name, size, key, location: url } = req.file;

        try {
            await Streetwear.create({
                name,
                size,
                key,
                url
            })

            return res.status(201).json({ message: "Streetwear publicado com sucesso!" });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    },

    async listStreetwear(req, res) {
        try {
            const streetwear = await Streetwear.findAll({})

            return res.status(200).json({ streetwear });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    },

    async deleteStreetwear(req, res) {

        const s3 = new aws.S3();

        const id = req.params.id;

        let keyImage = await Streetwear.findOne({
            attributes: ['key'],
            where: {
                id: id
            }
        });

        let params = {
            Bucket: "atraves-dos-olhares",
            Key: keyImage.key
        }

        try {
            s3.deleteObject(params, function (err, data) {
                if (err) console.log(err)
                else return data
            });

            await Streetwear.destroy({ where: { id } })

            return res.status(200).json({ message: "Streetwear deletado com sucesso!" })
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

}


