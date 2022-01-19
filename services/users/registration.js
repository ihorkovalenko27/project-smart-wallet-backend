
const { User, userSchema } = require('../../models');
const { AppError } = require('../../helpers');
const {tokenService} = require('../../helpers');


const userRegister = async ({ email, password }) => {
  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    throw  AppError.RegisterConflictError();
  }

  userSchema.path('password').required(true);
  const user = await new User({ email});
  user.setPassword(password);
  await user.save();
  const tokenShort = tokenService.generateToken({ _id: user._id });
  await tokenService.saveToken(user._id,tokenShort);


  const newUser = {
    tokenShort,
    email: user.email,
    balance:user.balance,
  };

  return newUser;
};

module.exports = userRegister;