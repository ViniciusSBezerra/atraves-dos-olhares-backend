
const Ensaios = require('../database/models/ensaios');

const aws = require('aws-sdk');

module.exports = {
    async uploadEnsaio(req, res) {
        const { originalname: name, size, key, location: url } = req.file

        await Ensaios.create({
            name,
            size,
            key,
            url

        }).then(() => {
            return res.json({
                error: false,
                message: "Ensaio enviado com sucesso!"
            })
        })

    },

    async visualizarEnsaio(req, res){

        const id = req.params.id;

        await Ensaios.findOne({ where : { id }}).then((response)=>{
            return res.json({
                error: false,
                response
            })
        })
    },

    async listEnsaio(req, res) {

        Ensaios.findAll({}).then((response) => {
            return res.json({
                error: false,
                response
            })
        })
    },

    async deleteEnsaio(req, res) {
        const s3 = new aws.S3();

        const id = req.params.id;

        let keyImage = await Ensaios.findOne({
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

        await Ensaios.destroy({ where: { id } }).then(() => {

            return res.json({
                error: false,
                message: "Imagem deletada com sucesso!"
            })
        })
    }

}

