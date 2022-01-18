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

    res.status(201).json(result);
  }

  async deleteTransaction(req, res, next) {
    const { id } = req.params;
    const result = await deleteTransaction(id);

    res.json({
      status: 'success',
      message: 'contact deleted',
      data: {
        result,
      },
    });
  }

  async getMonthTransactions(req, res, next) {
    const { _id: id } = req.user;
    const { year, month, type } = req.params;
    const result = await getMonthTransactions({ year, month, type, id });

    res.status(200).json(result);
  }

  async getMonthCategoriesSum(req, res, next) {
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
