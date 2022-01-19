const {
  getMonthTransactions,
  addTransaction,
  getMonthCategoriesSum,
  deleteTransaction,
} = require('../services/transactions');

class TransactionController {
  async addTransaction(req, res, next) {
    const { _id: id } = req.user;
    const { type } = req.params;
    const result = await addTransaction({ ...req.body, type, owner: id });

    res.json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async deleteTransaction(req, res, next) {
    const { id } = req.params;
    const { _id: ownerId } = req.user;

    const result = await deleteTransaction({ id, ownerId });

    res.json({
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

    res.status(200).json(result);
  }

  async getMonthCategoriesSumCtrl(req, res, next) {
    const { _id: id } = req.user;
    const { year, month, type, propName, categoryType } = req.params;
    const result = await getMonthCategoriesSum({
      year,
      month,
      type,
      propName,
      categoryType,
      id,
    });

    res.status(200).json(result);
  }
}

module.exports = new TransactionController();
