const { sumTransactionsValue } = require('../../helpers');
const { NotFoundError } = require('../../helpers/errors');
const { Transaction } = require('../../models');

const getMonthCategoriesSum = async ({
  year,
  month,
  type,
  propName,
  categoryType,
  id,
}) => {
  const searchData =
    categoryType === 'all'
      ? { year, month, type, owner: id }
      : { year, month, type, owner: id, category: categoryType };

  const allTransactions = await Transaction.find(searchData);
  if (!allTransactions[0]) {
    throw NotFoundError();
  }

  const result = {
    type,
    category: categoryType,
    [propName]: sumTransactionsValue(allTransactions, propName),
  };

  return result;
};

module.exports = getMonthCategoriesSum;
