const express = require('express');

const router = express.Router();
const { asyncWrapper } = require('../../helpers');
const { UserController } = require('../../contollers');
const { authMiddleware, ValidationMiddlewares } = require('../../middlewares');
const { joiUserSchema } = require('../../models/user');
const { getCurrentUserCtrl } = require('../../contollers/userController');

//POST register user
router.post(
  '/register',
  ValidationMiddlewares(joiUserSchema),
  asyncWrapper(UserController.register),
);

//POST login user
router.post(
  '/login',
  ValidationMiddlewares(joiUserSchema),
  asyncWrapper(UserController.logIn),
);

//POST logout 
router.post('/logout', authMiddleware, asyncWrapper(UserController.logOut));

//PATCH update users balance
router.patch(
  '/:balance',
  authMiddleware,
  asyncWrapper(UserController.updateBalance),
);

//GET current user
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserCtrl));

//POST get new tokens and session id
router.post('/refresh', asyncWrapper(UserController.refreshTokens));

module.exports = router;
