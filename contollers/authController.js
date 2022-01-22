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
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/api/v1/auth/google-redirect`,
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        response_type: 'code',
        acces_type: 'offline',
        prompt: 'consent',
      });
      return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
      );
    } catch (error) {
      throw AppError.BadRequest(error.message);
    }
  }

  async redirect(req, res) {
    try {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const urlObj = new URL(fullUrl);
      const urlParams = queryString.parse(urlObj.search);
      const { code } = urlParams;
      const tokenData = await axios({
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
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      });

      const {
        data: { email },
      } = userData;
      const user = await User.findOne({ email });
      let sid;
      if (!user) {
        userSchema.path('password').required(false);
        const newUser = new User({ email });
        await newUser.save();
        const newSession = await Session.create({ uid: user._id });
        const { acces_token } = tokenService.generateToken({
          uid: newUser._id,
          sid: newSession._id,
        });
        const { refresh_token } = tokenService.generateToken({
          uid: newUser._id,
          sid: newSession._id,
        });
        sid = newSession._id;
        return res.redirect(
          `${FRONTEND_URL}?acces_token=${acces_token}&refresh_token=${refresh_token}&sid=${sid}&id=${newUser._id}`,
        );
      }
      const newSession = await Session.create({ uid: user._id });
      const { acces_token } = tokenService.generateToken({
        uid: user._id,
        sid: newSession._id,
      });
      const { refresh_token } = tokenService.generateToken({
        uid: user._id,
        sid: newSession._id,
      });
      res.redirect(
        `${FRONTEND_URL}?acces_token=${acces_token}&refresh_token=${refresh_token}&sid=${sid}&id=${user._id}`,
      );
    } catch (error) {
      throw AppError.BadRequest(error.message);
    }
  }
}

module.exports = new AuthController();
