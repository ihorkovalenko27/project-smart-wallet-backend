const { NotFoundError } = require('../../helpers/errors');
const { Transaction } = require('../../models');

const getMonthTransactions = async ({ year, month, type, id }) => {
  const searchData =
    type === 'all'
      ? { year, month, owner: id }
      : { year, month, type, owner: id };

  const transactions = await Transaction.find(searchData);
  let total = 0;

  if (!transactions[0]) {
    throw NotFoundError();
  }

  if (transactions.length === 1) {
    total = transactions[0].sum;
  } else {
    total = transactions.reduce((a, b) => ({ sum: a.sum + b.sum })).sum;
  }

  return type === 'all' ? { transactions } : { transactions, total };
};

module.exports = getMonthTransactions;
