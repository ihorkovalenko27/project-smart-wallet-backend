const express = require('express');
const router = express.Router();

const { TransactionController } = require('../../contollers');
const { asyncWrapper } = require('../../helpers');

const { authMiddleware } = require('../../middlewares');

router.get(
  '/:year/:month/:type',
  authMiddleware,
  asyncWrapper(TransactionController.getMonthTransactions),
);

router.get(
  '/:year/:month/:type/:propName/:categoryType',
  authMiddleware,
  asyncWrapper(TransactionController.getMonthCategoriesSum),
);

router.post(
  '/:type',
  authMiddleware,
  asyncWrapper(TransactionController.addTransaction),
);

router.delete(
  '/:id',
  authMiddleware,
  asyncWrapper(TransactionController.deleteTransaction),
);

module.exports = router;
