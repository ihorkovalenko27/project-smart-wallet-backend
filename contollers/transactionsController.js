const {
  getMonthTransactions,
  addTransaction,
  getMonthCategoriesSum,
  deleteTransaction,
} = require('../services/transactions');

class TransactionController {
  async addTransactionCtrl(req, res, next) {
    const { _id: id } = req.user;
    const { type } = req.params;
    const result = await addTransaction({ ...req.body, type, owner: id });

    res.status(201).json({
      status: 'success',
      data: result,
    });
  }

  async deleteTransactionCtrl(req, res, next) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const result = await deleteTransaction({ id, userId });

    res.status(201).json({
      status: 'success',
      message: 'Transaction deleted',
      data: {
        result,
      },
    });
  }

  async getMonthTransactionsCtrl(req, res, next) {
    const { _id: id } = req.user;
    const { year, month, type } = req.params;
    const result = await getMonthTransactions({ year, month, type, id });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  async getMonthCategoriesSumCtrl(req, res, next) {
    const { _id: id } = req.user;
    const { year, month, type } = req.params;
    const result = await getMonthCategoriesSum({
      year,
      month,
      type,
      id,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }
}

module.exports = new TransactionController();
