require("dotenv").config();
const multer = require('multer');

const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'upload'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'atraves-dos-olhares',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })

        }
    })

}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'upload'),
    storage: storageTypes["s3"],

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpg',
            'image/pjpeg',
            'image/jpeg',
            'image/png'
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Erro: Formato do arquivo invalido!"))
        }
    }

}