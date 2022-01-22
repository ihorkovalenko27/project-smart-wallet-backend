const jwt = require('jsonwebtoken');
const { Session, User } = require('../../models');
const { tokenService } = require('../../helpers');
const { AppError } = require('../../helpers');

const getNewTokens = async ({ authorization, session }) => {
  if (!authorization) {        //checking authorization header
    throw AppError.NotAuthorizedError(
      'Please, provide a token in request authorization header',
    );
  }
  const activeSession = await Session.findById(session);  //checking session
  if (!activeSession) {
    throw AppError.NotAuthorizedError('Invalid session');
  }
  // eslint-disable-next-line no-unused-vars
  const [tokenType, refresh_token] = authorization.split(' ');   //destructure token from header
  let verify;
  try {
    verify = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);   //verify current token 
  } catch (error) {
    await Session.findByIdAndDelete(session);       //if not valid delete session from database
    return AppError.NotAuthorizedError('Unauthorized');
  }

  const user = await User.findById(verify.uid);     //try to find user and session in database
  const currentSession = await Session.findById(verify.sid);
  if (!user) {
    throw AppError.NotAuthorizedError('Invalid user');
  }
  if (!currentSession) {
    throw AppError.NotAuthorizedError('Invalid session');
  }
  await Session.findByIdAndDelete(verify.sid);    //delete session from database
  const newSession = await Session.create({       //create new session
    uid: user._id,
  });
  const tokens = tokenService.generateToken({    //generate new pair of tokens
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
