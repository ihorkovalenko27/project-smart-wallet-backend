const express = require('express');

const router = express.Router();
const { asyncWrapper } = require('../../helpers');
const { AuthController } = require('../../contollers');

router.get('/google', asyncWrapper(AuthController.login));

router.get('/google-redirect', asyncWrapper(AuthController.redirect));

module.exports = router;
