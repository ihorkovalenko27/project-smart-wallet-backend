const { User } = require('../../models');
const { AppError } = require('../../helpers');

const userLogout = async ({ _id }, shortToken) => {
  const user = await User.findOne({ _id });
  if (!user) {
    throw AppError.NotAuthorizedError(`User with id : '${_id}' not found`);
  }
  await User.findByIdAndUpdate(_id, { shortToken: null });
};

module.exports = userLogout;