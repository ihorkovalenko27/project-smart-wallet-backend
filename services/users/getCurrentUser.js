const getCurrentUser = ({ _id, balance, email, acces_token, refresh_token }) => {
  const userData = { id: _id, email, balance, acces_token, refresh_token };
  return userData;
};

module.exports = getCurrentUser;
