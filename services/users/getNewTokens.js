const jwt = require('jsonwebtoken');
const { Session, User } = require('../../models');
const { tokenService } = require('../../helpers');
const { AppError } = require('../../helpers');

const getNewTokens = async ({ authorization, session }) => {
  if (!authorization) {
    throw AppError.NotAuthorizedError(
      'Please, provide a token in request authorization header',
    );
  }
  const activeSession = await Session.findById(session);
  if (!activeSession) {
    throw AppError.NotAuthorizedError('Invalid session');
  }
  // eslint-disable-next-line no-unused-vars
  const [tokenType, refresh_token] = authorization.split(' ');
  let verify;
  try {
    verify = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    await Session.findByIdAndDelete(session);
    return AppError.NotAuthorizedError('Unauthorized');
  }

  const user = await User.findById(verify.uid);
  const currentSession = await Session.findById(verify.sid);
  if (!user) {
    throw AppError.NotAuthorizedError('Invalid user');
  }
  if (!currentSession) {
    throw AppError.NotAuthorizedError('Invalid session');
  }
  await Session.findByIdAndDelete(verify.sid);
  const newSession = await Session.create({
    uid: user._id,
  });
  const tokens = tokenService.generateToken({
    uid: user._id,
    sid: newSession._id,
  });

  return {
    new_acces_token: tokens.acces_token,
    new_refresh_token: tokens.refresh_token,
    newSid: newSession._id,
  };
};

module.exports = getNewTokens;
