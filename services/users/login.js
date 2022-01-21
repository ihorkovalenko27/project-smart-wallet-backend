const { User } = require('../../models');
const { AppError } = require('../../helpers');
const {Session} = require('../../models');
const {tokenService} = require('../../helpers');

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw  AppError.BadRequest(`Email: '${email}' not found`);
  };
  if (!user.comparePassword(password)) {
    throw  AppError.BadRequest('Password is wrong');
  };
  const newSession = await Session.create({
    uid: user._id,
  });
  const {acces_token} = tokenService.generateToken({ uid: user._id,sid: newSession._id  });
  const {refresh_token} = tokenService.generateToken({ uid: user._id, sid: newSession._id  });
  return {
    acces_token,
    refresh_token,
    sid: newSession._id,
    user
  };
};

module.exports = userLogin;
