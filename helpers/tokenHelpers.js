const jwt = require('jsonwebtoken');
 //custom class for generate tokens
class TokenService {
  generateToken(payload) {
    const acces_token = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
    });
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    });
    return {
      acces_token,
      refresh_token,
    };
  }
}

module.exports = new TokenService();
