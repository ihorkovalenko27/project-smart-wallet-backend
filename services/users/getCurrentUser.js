const getCurrentUser = ({ _id, balance, email, tokenShort, tokenLong }) => {
  const userData = { id: _id, email, balance, tokenShort, tokenLong };
  return userData;
};

module.exports = getCurrentUser;
