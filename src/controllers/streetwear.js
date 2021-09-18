const Image = require('../database/models/image')

const aws = require("aws-sdk")

module.exports = {

    async upload(req, res) {
        const { originalname: name, size, key, location: url } = req.file

        await Image.create({
            name,
            size,
            key,
            url
        }).then(() => {
            return res.json({
                error: false,
                message: "Streetwear enviado com sucesso!"
            })
        })

    },

    async listImage(req, res) {
        Image.findAll({}).then((response) => {
            return res.json({
                response
            })
        })
    },

    async deleteImage(req, res) {

        const s3 = new aws.S3();

        const id = req.params.id;

        let keyImage = await Image.findOne({
            attributes: ['key'],
            where: {
                id: id
            }
        })

        let params = {
            Bucket: "atraves-dos-olhares",
            Key: keyImage.key
        }

        s3.deleteObject(params, function (err, data) {
            if (err) console.log(err)
            else return data
        })

        await Image.destroy({ where: { id } }).then(() => {

            return res.json({
                error: false,
                message: "Imagem deletada com sucesso!"
            })
        })
    }
}




