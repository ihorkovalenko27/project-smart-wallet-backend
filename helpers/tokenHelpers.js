const jwt = require('jsonwebtoken');
const {User} = require('../models');

class TokenService{
    generateToken(payload){
    const tokenShort = jwt.sign(payload,process.env.ACCES_TOKEN_SECRET,{expiresIn:'1h'});
    return tokenShort;
    };

    async saveToken(userId,tokenShort){
    await User.findByIdAndUpdate(userId, { tokenShort },{new:true});
     };

};

module.exports = new TokenService();