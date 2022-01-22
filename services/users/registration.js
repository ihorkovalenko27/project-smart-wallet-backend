const { User, userSchema } = require('../../models');
const { Session } = require('../../models');
const { AppError } = require('../../helpers');
const { tokenService } = require('../../helpers');

const userRegister = async ({ email, password }) => {
  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    throw AppError.RegisterConflictError();
  }

  userSchema.path('password').required(true);
  const user = await new User({ email });
  user.setPassword(password);
  await user.save();
  const newSession = await Session.create({
    uid: user._id,
  });
  const { acces_token } = tokenService.generateToken({
    uid: user._id,
    sid: newSession._id,
  });
  const { refresh_token } = tokenService.generateToken({
    uid: user._id,
    sid: newSession._id,
  });
  return {
    acces_token,
    refresh_token,
    sid: newSession._id,
    user,
  };
};

module.exports = userRegister;
