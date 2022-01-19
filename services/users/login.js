const { User } = require('../../models');
const { AppError } = require('../../helpers');
const {tokenService} = require('../../helpers')

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw  AppError.BadRequest(`Email: '${email}' not found`);
  };
  if (!user.comparePassword(password)) {
    throw  AppError.BadRequest('Password is wrong');
  };
  const tokenShort = tokenService.generateToken({ _id: user._id });
  await tokenService.saveToken(user._id,tokenShort);
  const newUser = {
    tokenShort,
    email: user.email,
    balance:user.balance,
  }

  return newUser;
};

module.exports = userLogin;
