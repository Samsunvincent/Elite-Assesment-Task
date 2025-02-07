const express = require('express');
const Router = express.Router();

const userController = require('../Controller/userController');

const accessControl = require('../Controller/aceessControl').accessControl

const upload = require('../utils/FileUpload');

function setAccessControl(access_types) {
    return (req, res, next) => {
        accessControl(access_types, req, res, next)
    }
}

Router.post('/signUp', userController.createUser)
Router.post('/signUp/Vendor', userController.createUser)
Router.post('/signUp/Staff',setAccessControl("4"),userController.createUser);
Router.post('/addProduct',setAccessControl('1,2,4'),upload,userController.addProduct)

module.exports = Router;