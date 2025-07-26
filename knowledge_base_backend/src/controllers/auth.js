const authService = require('../services/auth');

/**
 * PUBLIC_INTERFACE
 * Controller for user registration and login
 */
class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(
        req.body.email,
        req.body.password,
        req.body.name
      );
      res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      err.status = 400;
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.json(result);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  }
}

module.exports = new AuthController();
