const { BadRequest } = require('./errors');

const checkUserBalance = balance => {
  if (balance < 0) {
    throw BadRequest(
      'As a result of this operation the balance will be negative.',
    );
  } else return true;
};

module.exports = checkUserBalance;

