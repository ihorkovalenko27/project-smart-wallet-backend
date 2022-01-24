const {
  getMonthTransactions,
  addTransaction,
  getMonthCategoriesSum,
  deleteTransaction,
} = require('../services/transactions');

class TransactionController {
  async addTransactionCtrl(req, res) {
    const { _id: id } = req.user;
    const { type } = req.params;
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const result = await addTransaction({ ...req.body, type, owner: id });

    res.status(201).json({
      status: 'success',
      data: result,
    });
  }

  async deleteTransactionCtrl(req, res) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const result = await deleteTransaction({ id, userId });

    res.status(201).json({
      status: 'success',
      message: 'Transaction deleted',
      data: result,
    });
  }

  async getMonthTransactionsCtrl(req, res) {
    const { _id: id } = req.user;
    const { year, month, type } = req.params;
    const result = await getMonthTransactions({ year, month, type, id });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  async getMonthCategoriesSumCtrl(req, res) {
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

  async getMonthTransactionsTotalAmountsCtrl(req, res) {
    // const { _id: id } = req.user;
    // const { year, month, type } = req.params;
    const result = {
      '01': 100,
      '02': 200,
      '03': 300,
      '04': 400,
      '05': 500,
      '06': 600,
    };

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }
}

module.exports = new TransactionController();
