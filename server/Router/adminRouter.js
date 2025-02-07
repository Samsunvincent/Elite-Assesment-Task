const express = require('express');
const Router = express.Router();

const adminController = require('../Controller/adminController');
const accessControl = require('../Controller/aceessControl').accessControl

function setAccessControl(access_types) {
    return (req, res, next) => {
        accessControl(access_types, req, res, next)
    }
}

Router.get('/vendor',setAccessControl("4"),adminController.vendors)
Router.get('/staff',setAccessControl("4"),adminController.staff);
Router.get('/user',setAccessControl("4"),adminController.users)

module.exports = Router
