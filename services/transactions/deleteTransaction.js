const { NotFoundError, checkUserBalance } = require('../../helpers');
const { Transaction, User } = require('../../models');

const deleteTransaction = async ({ id, ownerId }) => {
  const user = await User.findById(ownerId);
  const userBalance = user.balance;
  const userTransaction = await Transaction.findById(id);
  const userTransactionSum = userTransaction.sum;
  const userTransactionType = userTransaction.type;
  const newUserBalance =
    userTransactionType === 'income'
      ? user.balance - userTransactionSum
      : user.balance + userTransactionSum;

  if (checkUserBalance(newUserBalance)) {
    await User.findByIdAndUpdate(
      ownerId,
      { balance: newUserBalance },
      { new: true },
    );
    const result = await Transaction.findByIdAndRemove(id);
    return result;
  }
};

module.exports = deleteTransaction;
