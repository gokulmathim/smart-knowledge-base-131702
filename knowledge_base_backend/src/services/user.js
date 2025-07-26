const { User } = require('../models');

/**
 * PUBLIC_INTERFACE
 * User profile and admin management service.
 */

// Get user by ID (excluding passwordHash)
async function getUserById(id) {
  const user = await User.findByPk(id, { attributes: { exclude: ['passwordHash'] } });
  if (!user) throw new Error('User not found');
  return user;
}

// Update user by ID (for self or admin)
async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  // Only name can be updated by regular users, admins can update 'role' or 'status'
  if ('email' in data && data.email !== user.email) {
    throw new Error('Email cannot be changed.');
  }
  // Only allow name and, if admin present, role/status
  let updateFields = {};
  if ('name' in data) updateFields.name = data.name;
  if ('role' in data) updateFields.role = data.role;
  if ('status' in data) updateFields.status = data.status;
  await user.update(updateFields);
  return getUserById(user.id);
}

// Delete user (self or admin)
async function deleteUser(id, calledByAdmin = false) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  if (user.role === 'admin' && !calledByAdmin) throw new Error('Cannot delete admin user');
  await user.destroy();
  return { success: true };
}

// Admin: set user role
async function setUserRole(id, role) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  user.role = role;
  await user.save();
  return getUserById(user.id);
}

// Admin: activate/suspend user
async function setUserStatus(id, status) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  user.status = status;
  await user.save();
  return getUserById(user.id);
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
  setUserRole,
  setUserStatus,
};
