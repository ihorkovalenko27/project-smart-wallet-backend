const queryString = require('query-string');
const axios = require('axios');
const { User, userSchema, Session } = require('../models');
const { tokenService } = require('../helpers');

const { BASE_URL, FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env;
const { AppError } = require('../helpers');

class AuthController {
  async login(req, res) {
    try {
      const stringifiedParams = queryString.stringify({
        // set parameters for google request
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/api/v1/auth/google-redirect`, // url on wich google should send info about user
        scope: [
          'https://www.googleapis.com/auth/userinfo.email', // info about user:email,profile
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        response_type: 'code',
        acces_type: 'offline',
        prompt: 'consent',
      });
      return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`, // send credentials to google api
      );
    } catch (error) {
      throw AppError.BadRequest(error.message);
    }
  }

  async redirect(req, res) {
    try {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`; // full request link
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const urlObj = new URL(fullUrl); // convert link to class with methods
      const urlParams = queryString.parse(urlObj.search); // parse string
      const { code } = urlParams;
      const tokenData = await axios({
        // get authorization token from google
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: `${BASE_URL}/api/v1/auth/google-redirect`,
          grant_type: 'authorization_code',
          code,
        },
      });

      const userData = await axios({
        // get info about user from google
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`, // set token for authorization
        },
      });

      const {
        data: { email },
      } = userData;
      const user = await User.findOne({ email }); // search user from google in database

      if (!user) {
        // if doesnt exist - create new user
        userSchema.path('password').required(false);
        const newUser = new User({ email });
        await newUser.save();
        const newSession = await Session.create({ uid: newUser._id }); // create new session
        const { acces_token } = tokenService.generateToken({
          // generate tokens
          uid: newUser._id,
          sid: newSession._id,
        });
        const { refresh_token } = tokenService.generateToken({
          uid: newUser._id,
          sid: newSession._id,
        });
        // redirect response to client with tokens and session id
        return res.redirect(
          `${FRONTEND_URL}?acces_token=${acces_token}&refresh_token=${refresh_token}&sid=${newSession._id}&id=${newUser._id}`,
        );
      }
      // if user exist in database
      const newSession = await Session.create({ uid: user._id }); // create new session
      const { acces_token } = tokenService.generateToken({
        // generate tokens
        uid: user._id,
        sid: newSession._id,
      });
      const { refresh_token } = tokenService.generateToken({
        uid: user._id,
        sid: newSession._id,
      });
      // redirect response with tokens and session id
      res.redirect(
        `${FRONTEND_URL}?acces_token=${acces_token}&refresh_token=${refresh_token}&sid=${newSession._id}&id=${user._id}`,
      );
    } catch (error) {
      throw AppError.BadRequest(error.message);
    }
  }
}

module.exports = new AuthController();
