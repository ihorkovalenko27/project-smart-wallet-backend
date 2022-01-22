const jwt = require('jsonwebtoken');
const { AppError } = require('../helpers');
const { User } = require('../models');
const { Session } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(
        AppError.NotAuthorizedError(
          'Please, provide a token in request authorization header',
        ),
      );
    }
    const [tokenType, acces_token] = authorization.split(' '); //destructure token from authorization header

    if (tokenType !== 'Bearer') {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    if (!acces_token) {
      next(AppError.NotAuthorizedError('Please, provide a token'));
    }

    const verify = jwt.verify(acces_token, process.env.ACCES_TOKEN_SECRET); //cheking current tokens

    if (!verify) {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    const user = await User.findById(verify.uid);      //search user and session in database
    const session = await Session.findById(verify.sid);
    if (!user) {
      next(AppError.NotAuthorizedError('Invalid user'));
    }
    if (!session) {
      next(AppError.NotAuthorizedError('Invalid session'));
    }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    next(AppError.NotAuthorizedError(error.message));
  }
};

module.exports = {
  authMiddleware,
};
