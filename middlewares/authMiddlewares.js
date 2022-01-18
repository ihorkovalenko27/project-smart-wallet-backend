const jwt = require('jsonwebtoken');
const { AppError } = require('../helpers');
const { User } = require('../models');


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
 const [tokenType, tokenShort] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    if (!tokenShort) {
      next(AppError.NotAuthorizedError('Please, provide a token'));
    }

    const verify = jwt.verify(tokenShort, process.env.ACCES_TOKEN_SECRET);
  
    if (!verify) {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    const user = await User.findOne({ _id: verify._id })
    if (!user || !user.tokenShort) {
      next(AppError.NotAuthorizedError('User not authorized'));
    }

    req.token = tokenShort;
    req.user = user;
    next();
  } catch (error) {
    next(AppError.NotAuthorizedError('User not authorized'))
  }
};

module.exports = {
  authMiddleware,
};
