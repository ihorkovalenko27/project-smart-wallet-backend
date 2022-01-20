const { transactionsData } = require('../../helpers');
const { NotFoundError } = require('../../helpers/errors');
const { Transaction } = require('../../models');

const getMonthCategoriesSum = async ({ year, month, type, id }) => {
  const allTransactions = await Transaction.find({
    year,
    month,
    type,
    owner: id,
  });
  if (!allTransactions[0]) {
    throw NotFoundError();
  }

  const result = transactionsData(allTransactions);
  return result;
};

module.exports = getMonthCategoriesSum;
