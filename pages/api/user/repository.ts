import UserModel from '../../../lib/models/user';

export async function createUser(user: { name: string; email: string; password: string }) {
  return await UserModel.create(user);
}

export async function getUserById(id: string) {
  return await UserModel.findById(id);
}

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email: { $eq: email } });
}

export async function getUserByPasswordResetHash(hash: string) {
  return await UserModel.findOne({ password_reset_hash: { $eq: hash } });
}
