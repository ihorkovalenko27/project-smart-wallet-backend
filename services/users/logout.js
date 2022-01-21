const{Session} = require('../../models')

const userLogout = async ({currentSession}) => {
  await Session.deleteOne({ _id: currentSession._id });
};

module.exports = userLogout;