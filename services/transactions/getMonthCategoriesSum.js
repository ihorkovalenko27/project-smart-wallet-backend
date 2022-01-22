const { transactionsData } = require('../../helpers');
const { Transaction } = require('../../models');

const getMonthCategoriesSum = async ({ year, month, type, id }) => {
  const allTransactions = await Transaction.find({
    year,
    month,
    type,
    owner: id,
  });

  if (!allTransactions[0]) {
    return [];
  }

  const result = transactionsData(allTransactions);
  return result;
};

module.exports = getMonthCategoriesSum;
