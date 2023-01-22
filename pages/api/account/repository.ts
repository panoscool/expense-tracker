import { v4 as uuidv4 } from 'uuid';
import { AccountCreate } from '../../../lib/interfaces/account';
import AccountModel from '../../../lib/models/account';

export async function createAccount(account: Partial<AccountCreate> & { user: string; users: string[] }) {
  return await AccountModel.create({
    _id: uuidv4(),
    user: account.user,
    users: account.users,
    name: account.name,
    currency: account.currency,
    description: account.description,
  });
}

export async function updateAccountById(id: string, account: Partial<AccountCreate>) {
  return await AccountModel.updateOne(
    { _id: id },
    {
      name: account.name,
      currency: account.currency,
      description: account.description,
    },
  );
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

export async function addAccountUserById(id: string, userId: string) {
  return await AccountModel.updateOne({ _id: id }, { $push: { users: userId } });
}

export async function removeAccountUserById(id: string, userId: string) {
  return await AccountModel.updateOne({ _id: id }, { $pull: { users: userId } });
}

export async function deleteAccountById(id: string) {
  return await AccountModel.deleteOne({ _id: id });
}
