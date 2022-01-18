const {
  userRegister,
  userLogin,
  userLogout,
  updateBalance,
} = require('../services/users');

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;
    const user = await userRegister({ email, password });
    res.status(201).json({ user: user });
  }

  async logIn(req, res, next) {
    const { email, password } = req.body;
    const user = await userLogin({ email, password });
    res.status(200).json({ user: user });
  }

  async logOut(req, res, next) {
    const { _id, tokenShort } = req.user;
    await userLogout({ _id, tokenShort });
    res.status(200).json({ message: 'logout successful' });
  }

  async updateBalance(req, res, next) {
    const { _id: id } = req.user;
    const { balance } = req.body;

    const result = await updateBalance({ id, balance });

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }
}

module.exports = new UserController();
