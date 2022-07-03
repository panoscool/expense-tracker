import { Document, model, Model, models, Schema, SchemaTypes } from 'mongoose';

interface IAccount extends Document {
  _id: string;
  user: Document['_id'];
  name: string;
  users: string[];
  description: string | null;
  currency: string | null;
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

const Account: Model<IAccount> = models.Account || model('Account', AccountSchema);

export default Account;
