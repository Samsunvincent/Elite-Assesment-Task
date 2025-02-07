const express = require('express')
const Router = express.Router();

const authController = require('../Controller/authController');

Router.post('/login',authController.login)

module.exports = Router