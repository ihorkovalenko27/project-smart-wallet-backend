const { User } = require('../../models');

const updateBalance = async ({ id, balance }) => {
  const user = await User.findByIdAndUpdate(id, { balance }, { new: true });
  const result = {
    id: user._id,
    email: user.email,
    balance: user.balance,
    acces_token: user.acces_token,
    refresh_token: user.refresh_token,
  };
  return result;
};

module.exports = updateBalance;
