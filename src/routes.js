
const routes = require('express').Router();

const multer = require('multer');

const uploadConfig = require('./middlewares/upload');

const uploadImage = require('./controllers/streetwear');

const uploadEnsaio = require('./controllers/ensaios');

const admin = require('./controllers/admin');

const login = require('./middlewares/login');

const authentication = require('./middlewares/authentication');

routes.post("/upload", authentication.authentication, multer(uploadConfig).single('image'), uploadImage.upload);
routes.get("/list-image", uploadImage.listImage);
routes.delete("/delete-image/:id", authentication.authentication, uploadImage.deleteImage);

routes.get("/visualizar-ensaio/:id", authentication.authentication, uploadEnsaio.visualizarEnsaio)
routes.post("/upload-ensaio", authentication.authentication, multer(uploadConfig).single('ensaio'), uploadEnsaio.uploadEnsaio);
routes.get("/list-ensaios", uploadEnsaio.listEnsaio);
routes.delete("/delete-ensaio/:id", authentication.authentication, uploadEnsaio.deleteEnsaio);

routes.post("/create-admin", authentication.authentication, admin.createAdmin);
routes.get("/list-admin", authentication.authentication, admin.listAdmin);
routes.delete("/delete-admin/:id", authentication.authentication, admin.deleteAdmin);
routes.put("/update-admin/:id", authentication.authentication, admin.updateAdmin);

routes.post("/login", login.login)


module.exports = routes