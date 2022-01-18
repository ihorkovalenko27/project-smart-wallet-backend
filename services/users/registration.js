
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { AppError } = require('../../helpers');
require('dotenv').config();

const userRegister = async ({ email, password }) => {
  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    throw  AppError.RegisterConflictError()
  }
 
  const user = await new User({ email, password});
  await user.save();

  const shortToken = jwt.sign({ _id: user._id }, process.env.ACCES_TOKEN_SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id,{ shortToken });

  const newUser = {
    shortToken,
    email: user.email,
    balance:user.balance,
  }

  return newUser
};

module.exports = userRegister;