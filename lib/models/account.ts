import { model, Schema, Model, Document, models, SchemaTypes } from 'mongoose';

export interface IAccount extends Document {
  _id: string;
  user: string;
  name: string;
  users: string[];
  description: string;
}

const AccountSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    users: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    description: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Account: Model<IAccount> = models.Account || model('Account', AccountSchema);

export default Account;
