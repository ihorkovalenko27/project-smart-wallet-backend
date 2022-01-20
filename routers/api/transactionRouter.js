const express = require('express');

const {
  getMonthCategoriesSumCtrl,
  getMonthTransactionsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
} = require('../../contollers/transactionsController');
const { asyncWrapper } = require('../../helpers');
const { authMiddleware } = require('../../middlewares');

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

router.post('/:type', authMiddleware, asyncWrapper(addTransactionCtrl));

router.delete('/:id', authMiddleware, asyncWrapper(deleteTransactionCtrl));

module.exports = router;
