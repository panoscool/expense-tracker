import { Account } from '../../../lib/interfaces/account';
import { User } from '../../../lib/interfaces/user';

export async function isAccountOwner(userId: string, accountUserId: string) {
  return userId?.toString() === accountUserId?.toString();
}

export async function hasAccountAccess(account: Account, userId: string) {
  return account.users.some((user: User) => user._id.toString() === userId);
}
