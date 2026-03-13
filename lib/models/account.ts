import { model, Model, models, Schema, SchemaTypes, Types } from 'mongoose';

interface IAccount {
  _id: string;
  user: Types.ObjectId | string;
  name: string;
  users: Array<Types.ObjectId | string>;
  description: string | null;
  currency: string;
  created_at: Date;
  updated_at: Date;
}

const AccountSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    users: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    description: { type: String, default: null },
    currency: { type: String, default: 'EUR' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const AccountModel: Model<IAccount> = models.Account || model('Account', AccountSchema);

export default AccountModel;
