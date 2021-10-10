
const routes = require('express').Router();

const multer = require('multer');

const uploadConfig = require('./middlewares/upload');

const uploadStreetwear = require('./controllers/streetwear');

const uploadEnsaio = require('./controllers/ensaios');

const admin = require('./controllers/admin');

const login = require('./middlewares/login');

const authentication = require('./middlewares/authentication');

routes.post("/upload-streetwear", authentication.authentication, multer(uploadConfig).single('image'), uploadStreetwear.uploadStreetwear);
routes.get("/view-streetwear/:id", authentication.authentication, uploadStreetwear.viewStreerwear);
routes.get("/list-streetwear", uploadStreetwear.listStreetwear);
routes.delete("/delete-streetwear/:id", authentication.authentication, uploadStreetwear.deleteStreetwear);

routes.get("/view-essay/:id", authentication.authentication, uploadEnsaio.visualizarEnsaio);
routes.post("/upload-ensaio", authentication.authentication, multer(uploadConfig).single('ensaio'), uploadEnsaio.uploadEnsaio);
routes.get("/list-ensaios", uploadEnsaio.listEnsaio);
routes.delete("/delete-ensaio/:id", authentication.authentication, uploadEnsaio.deleteEnsaio);

routes.post("/create-admin", authentication.authentication, admin.createAdmin);
routes.get("/list-admin", authentication.authentication, admin.listAdmin);
routes.delete("/delete-admin/:id", authentication.authentication, admin.deleteAdmin);
routes.put("/update-admin/:id", authentication.authentication, admin.updateAdmin);

routes.post("/login", login.login);


module.exports = routes