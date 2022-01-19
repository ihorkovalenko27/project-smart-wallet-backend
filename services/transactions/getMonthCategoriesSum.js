const { sumTransactionsValue } = require('../../helpers');
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

  const result = [];

  const uniqueCategories = allTransactions.reduce(
    (acc, elem) => acc.add(elem.category),
    new Set(),
  );

  uniqueCategories.forEach(element => {
    const filterTransactionsByCategories = allTransactions.filter(tr => {
      return tr.category === element;
    });

    const sum = {
      category: element,
      // will add dinamic count sum later
      sum: 9000,
      description: sumTransactionsValue(
        filterTransactionsByCategories,
        'description',
      ),
    };

    result.push(sum);
  });

  return result;
};

module.exports = getMonthCategoriesSum;
