const { Transaction, User } = require('../../models');

const addNewBalance = async ({ user, balance }) => {
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

  const id = user._id;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { balance },
    { new: true },
  );
  const result = {
    id: updatedUser._id,
    email: updatedUser.email,
    balance: updatedUser.balance,
    acces_token: updatedUser.acces_token,
    refresh_token: updatedUser.refresh_token,
  };
  return result;
};

module.exports = addNewBalance;
