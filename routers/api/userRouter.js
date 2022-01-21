const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers');
const { UserController } = require('../../contollers');
const { authMiddleware, ValidationMiddlewares } = require('../../middlewares');
const { joiUserSchema } = require('../../models/user');
const { getCurrentUserCtrl } = require('../../contollers/userController');

router.post(
  '/register',
  ValidationMiddlewares(joiUserSchema),
  asyncWrapper(UserController.register),
);
router.post(
  '/login',
  ValidationMiddlewares(joiUserSchema),
  asyncWrapper(UserController.logIn),
);
router.post('/logout', authMiddleware, asyncWrapper(UserController.logOut));
router.patch(
  '/:balance',
  authMiddleware,
  asyncWrapper(UserController.updateBalance),
);
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserCtrl));
router.post('/refresh', asyncWrapper(UserController.refreshTokens));


module.exports = router;
