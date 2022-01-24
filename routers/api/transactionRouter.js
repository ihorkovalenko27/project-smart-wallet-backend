const express = require('express');

const {
  getMonthCategoriesSumCtrl,
  getMonthTransactionsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
  getMonthTotalAmountsCtrl,
} = require('../../contollers/transactionsController');

const { asyncWrapper } = require('../../helpers');
const { authMiddleware, ValidationMiddlewares } = require('../../middlewares');
const { joiTransactionSchema } = require('../../models/transaction');

const router = express.Router();

router.get(
  '/:year/:month/:type',
  authMiddleware,
  asyncWrapper(getMonthTransactionsCtrl),
);

router.get(
  '/:year/:month/:type/data',
  authMiddleware,
  asyncWrapper(getMonthCategoriesSumCtrl),
);

router.get(
  '/:type/total',
  authMiddleware,
  asyncWrapper(getMonthTotalAmountsCtrl),
);

router.post(
  '/:type',
  authMiddleware,
  ValidationMiddlewares(joiTransactionSchema),
  asyncWrapper(addTransactionCtrl),
);

router.delete('/:id', authMiddleware, asyncWrapper(deleteTransactionCtrl));

module.exports = router;
