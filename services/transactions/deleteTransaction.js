const { NotFoundError, checkUserBalance } = require('../../helpers');
const { Transaction, User } = require('../../models');
const { updateBalance } = require('../users');

const deleteTransaction = async ({ id, userId }) => {
  const user = await User.findById(userId);
  const userTransaction = await Transaction.findById(id);
  const userTransactionSum = userTransaction.sum;
  const userTransactionType = userTransaction.type;
  const newUserBalance =
    userTransactionType === 'income'
      ? user.balance - userTransactionSum
      : user.balance + userTransactionSum;

  if (checkUserBalance(newUserBalance)) {
    updateBalance({ id: userId, balance: newUserBalance });
    const result = await Transaction.findByIdAndRemove(id);
    return result;
  }
};

module.exports = deleteTransaction;
