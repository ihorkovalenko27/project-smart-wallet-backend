const express = require('express');

const router = express.Router();
const { asyncWrapper } = require('../../helpers');
const { AuthController } = require('../../contollers');

// GET request from client and send request to google
router.get('/google', asyncWrapper(AuthController.login));

// GET response from google and redirect it to client
router.get('/google-redirect', asyncWrapper(AuthController.redirect));

module.exports = router;
