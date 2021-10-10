
const Ensaios = require('../database/models/ensaios');

const aws = require('aws-sdk');

module.exports = {
    async uploadEnsaio(req, res) {
        const { originalname: name, size, key, location: url } = req.file;

        try {
            await Ensaios.create({ name, size, key, url })

            return res.status(200).json({ message: "Ensaio publicado com sucesso!" })

        } catch (error) {
            return res.status(200).json({ message: error })
        }

    },

    async visualizarEnsaio(req, res) {

        const { id } = req.params;

        try {
            const essay = await Ensaios.findOne({ where: { id } })

            return res.status(200).json({ essay })
        } catch (error) {
            return res.status(200).json({ message: error })
        }
    },

    async listEnsaio(req, res) {

       try {
           const essay = await Ensaios.findAll({})

           return res.status(200).json({ ensaios: essay });
       } catch (error) {
        return res.status(400).json({ message: error });
       }
    },

    async deleteEnsaio(req, res) {
        const s3 = new aws.S3();
        const id = req.params.id;

        let keyImage = await Ensaios.findOne({
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
    
            await Ensaios.destroy({ where: { id } })

            return res.status(200).json({ message: "Ensaio deletado com sucesso!"});
        } catch (error) {
            return res.status(400).json({ message: error});
        }
        
    }

}

