import { v4 as uuidv4 } from 'uuid';
import { AccountCreate } from '../../../lib/interfaces/account';
import AccountModel from '../../../lib/models/account';

export async function createAccount(account: Partial<AccountCreate> & { user: string; users: string[] }) {
  return await AccountModel.create({ _id: uuidv4(), ...account });
}

export async function getAccountById(id: string) {
  return await AccountModel.findById(id);
}

export async function getAccountsPopulatedByUserId(userId: string) {
  return await AccountModel.find({ users: userId }).populate('users', 'name email image');
}

export async function getAccountPopulatedById(id: string) {
  return await AccountModel.findById(id).populate('users', 'name email image');
}

export async function updateAccountById(id: string, account: Partial<AccountCreate>) {
  return await AccountModel.updateOne({ _id: id }, { ...account });
}

export async function addAccountUserById(id: string, userId: string) {
  // if user does not exist in the account users array add it
  return await AccountModel.updateOne(
    { _id: id },
    { $expr: { $eq: [{ $indexOfArray: ['$users', userId] }, -1] } },
    { $push: { users: userId } },
  );
}

export async function removeAccountUserById(id: string, userId: string) {
  // if user exists in the account users array remove it
  return await AccountModel.updateOne(
    { _id: id },
    { $expr: { $ne: [{ $indexOfArray: ['$users', userId] }, -1] } },
    { $pull: { users: userId } },
  );
}

export async function deleteAccountById(id: string) {
  return await AccountModel.deleteOne({ _id: id });
}
