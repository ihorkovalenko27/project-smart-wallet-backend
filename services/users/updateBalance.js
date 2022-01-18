const { User } = require('../../models');

const updateBalance = async ({ id, balance }) => {
  const result = await User.findByIdAndUpdate(id, { balance }, { new: true });
  return result;
};

module.exports = updateBalance;
