const transactionsData = arr => {
  const result = [];

  const sumOfTransactionDescription = arr => {
    const allDescriptions = arr.reduce((result, transactions) => {
      result.push({ [transactions.description]: transactions.sum });
      return result;
    }, []);

    const descriptionsSum = allDescriptions.reduce((result, current) => {
      for (let key in current) {
        let value = current[key];

        if (result[key] === undefined) {
          result[key] = value;
        } else {
          result[key] += value;
        }
      }

      return result;
    }, {});

    return descriptionsSum;
  };

  const getUniqueCategories = arr.reduce(
    (acc, elem) => acc.add(elem.category),
    new Set(),
  );

  getUniqueCategories.forEach(element => {
    const filterTransactionsByCategories = arr.filter(tr => {
      return tr.category === element;
    });

    const sumOfCategories = filterTransactionsByCategories.reduce(
      (result, trans) => {
        result += trans.sum;
        return result;
      },
      0,
    );

    const resultByCategory = {
      category: element,
      sum: sumOfCategories,
      description: sumOfTransactionDescription(filterTransactionsByCategories),
    };

    result.push(resultByCategory);
  });

  return result;
};

module.exports = transactionsData;
