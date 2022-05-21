import { model, Schema, Model, Document, models } from 'mongoose';

interface IAccount extends Document {
  _id: string;
  user_id: string;
  label: string;
}

const AccountSchema: Schema = new Schema({
  _id: { type: String, required: true, auto: false },
  user_id: { type: String, required: true },
  label: { type: String, required: true },
});

const Account: Model<IAccount> = models.Account || model('Account', AccountSchema);

export default Account;
