const { User } = require('../../models');

const updateBalance = async ({ id, balance }) => {
  const user = await User.findByIdAndUpdate(id, { balance }, { new: true });
  const result = {
    id: user._id,
    email: user.email,
    balance: user.balance,
    tokenShort: user.tokenShort,
    tokenLong: user.tokenLong,
  };
  return result;
};

module.exports = updateBalance;
