const {
  userRegister,
  userLogin,
  userLogout,
  updateBalance,
  getCurrentUser,
} = require('../services/users');

class UserController {
  async register(req, res) {
    const { email, password } = req.body;
    const { tokenShort, user } = await userRegister({ email, password });
    res.status(201).json({
      status: 'success',
      data: {
        headers: { tokenShort },
        user: {
          id: user._id,
          email: user.email,
          balance: user.balance,
        },
      },
    });
  }

  async logIn(req, res) {
    const { email, password } = req.body;
    const { tokenShort, user } = await userLogin({ email, password });
    res.status(200).json({
      status: 'success',
      data: {
        headers: { tokenShort },
        user: {
          id: user._id,
          email: user.email,
          balance: user.balance,
        },
      },
    });
  }

  async logOut(req, res) {
    const { _id, tokenShort } = req.user;
    await userLogout({ _id, tokenShort });
    res.status(200).json({
      status: 'success',
      data: {
        message: 'You are logged out',
      },
    });
  }

  async updateBalance(req, res) {
    const { _id: id } = req.user;
    const { balance } = req.body;

    const result = await updateBalance({ id, balance });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  async getCurrentUserCtrl(req, res) {
    const result = await getCurrentUser(req.user);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  }
}

module.exports = new UserController();
