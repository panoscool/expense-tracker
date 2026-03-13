import { model, Schema, Model, models, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string | null;
  password_reset_hash: string | null;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    image: { type: String, default: null },
    password_reset_hash: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const UserModel: Model<IUser> = models.User || model('User', UserSchema);

export default UserModel;
