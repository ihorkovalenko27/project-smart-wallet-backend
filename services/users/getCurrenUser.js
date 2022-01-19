const getCurrentUser = ({ _id, balance, tokenShort, tokenLong }) => {
  const userData = { id: _id, balance, tokenShort, tokenLong };
  return userData;
};

module.exports = getCurrentUser;
