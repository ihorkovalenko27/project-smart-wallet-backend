const { NotFoundError } = require('../../helpers');
const { Transaction } = require('../../models');

const deleteTransaction = async id => {
  const result = await Transaction.findByIdAndRemove(id);
  if (!result) {
    throw new NotFoundError(`Transaction with id=${id} not found`);
  }
};

module.exports = deleteTransaction;
