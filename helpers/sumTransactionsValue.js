const sumTransactionsValue = (arr, value) => {
  const criteriasValue = arr.reduce((result, transactions) => {
    result.push({ [transactions[value]]: transactions.sum });
    return result;
  }, []);

  return criteriasValue.reduce((result, current) => {
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
};

module.exports = sumTransactionsValue;
