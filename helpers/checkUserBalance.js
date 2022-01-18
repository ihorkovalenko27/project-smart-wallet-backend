const { BadRequest } = require('./errors');

const checkUserBalance = balance => {
  if (balance < 0) {
    throw BadRequest(
      'As a result of adding this transaction the balance will be negative.',
    );
  }
};

module.exports = checkUserBalance;
