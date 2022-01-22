const transactionsData = arr => {
  const result = [];

  // eslint-disable-next-line no-shadow
  const sumOfTransactionDescription = arr => {
    const allDescriptions = arr.reduce((acc, transactions) => {
      acc.push({ [transactions.description]: transactions.sum });
      return acc;
    }, []);

    const descriptionsSum = allDescriptions.reduce((acc, current) => {
      for (let key in current) {
        let value = current[key];

        if (acc[key] === undefined) {
          acc[key] = value;
        } else {
          acc[key] += value;
        }
      }

      return acc;
    }, {});

    return descriptionsSum;
  };

  const getUniqueCategories = arr.reduce(
    (acc, elem) => acc.add(elem.category),
    new Set(),
  );

  getUniqueCategories.forEach(element => {
    const filterTransactionsByCategories = arr.filter(
      tr => tr.category === element,
    );

    const sumOfCategories = filterTransactionsByCategories.reduce(
      (acc, trans) => {
        acc += trans.sum;
        return acc;
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
