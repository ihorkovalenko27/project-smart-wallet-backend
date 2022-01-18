const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers');
const { UserController } = require('../../contollers');
const { authMiddleware } = require('../../middlewares');
const { getCurrentUserCtrl } = require('../../contollers/userController');

router.post('/register', asyncWrapper(UserController.register));
router.post('/login', asyncWrapper(UserController.logIn));
router.post('/logout', authMiddleware, asyncWrapper(UserController.logOut));
router.patch(
  '/:balance',
  authMiddleware,
  asyncWrapper(UserController.updateBalance),
);
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserCtrl));

module.exports = router;
