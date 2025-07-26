const userService = require('../services/user');

/**
 * PUBLIC_INTERFACE
 * Controller for user profile CRUD operations (authenticated), plus self-service profile management.
 */
class UserController {
  // GET /profile - get current user's profile
  async me(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // PUT /profile - update current user's profile
  async updateMe(req, res, next) {
    try {
      const updated = await userService.updateUser(req.user.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /profile - delete own account
  async deleteMe(req, res, next) {
    try {
      await userService.deleteUser(req.user.id, false);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // GET /users/:id (admin) - get user by id
  async get(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // PUT /users/:id (admin) - update user by id
  async update(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /users/:id (admin) - delete user by id
  async remove(req, res, next) {
    try {
      await userService.deleteUser(req.params.id, true);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // PATCH /users/:id/role (admin) - set user role
  async setRole(req, res, next) {
    try {
      const { role } = req.body;
      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      const user = await userService.setUserRole(req.params.id, role);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /users/:id/status (admin) - suspend/reactivate user
  async setStatus(req, res, next) {
    try {
      const { status } = req.body; // expected 'active' | 'suspended'
      if (!['active', 'suspended'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      const user = await userService.setUserStatus(req.params.id, status);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
