const { checkUserBalance } = require('../../helpers');
const { Transaction, User } = require('../../models');

const addTransaction = async body => {
  const { owner: userId, type, sum: transactionValue } = body;

  const user = await User.findById(userId);
  const newUserBalance =
    type === 'income'
      ? user.balance + transactionValue
      : user.balance - transactionValue;

  checkUserBalance(newUserBalance);

  await User.findByIdAndUpdate(
    userId,
    { balance: newUserBalance },
    { new: true },
  );

  const result = await Transaction.create(body);
  return result;
};

module.exports = addTransaction;
