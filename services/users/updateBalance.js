const { User, Transaction } = require('../../models');

const updateBalance = async ({ user, balance }) => {
  const dateNow = new Date();

  const newTransaction = {
    owner: user._id,
    type: balance > user.balance ? 'income' : 'costs',
    sum:
      balance > user.balance ? balance - user.balance : user.balance - balance,
    category: 'Прочее',
    description: 'Изменение баланса пользователем',
    day:
      `${dateNow.getDay() + 1}`.length < 2
        ? `0${dateNow.getDay() + 1}`
        : `${dateNow.getDay() + 1}`,
    month:
      `${dateNow.getMonth() + 1}`.length < 2
        ? `0${dateNow.getMonth() + 1}`
        : `${dateNow.getMonth() + 1}`,
    year: `${dateNow.getFullYear()}`,
  };

  if (balance !== user.balance) {
    await Transaction.create(newTransaction);
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { balance },
    { new: true },
  );

  const result = {
    id: user._id,
    email: user.email,
    balance: updatedUser.balance,
    acces_token: user.acces_token,
    refresh_token: user.refresh_token,
  };
  return result;
};

module.exports = updateBalance;
