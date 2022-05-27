import { model, Schema, Model, Document, models, SchemaTypes } from 'mongoose';

export interface INotification extends Document {
  _id: string;
  user_id: string;
  account_id: string;
  message: string;
}

const NotificationSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user_id: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    account_id: { type: String, required: true },
    message: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Notification: Model<INotification> =
  models.Account || model('Notification', NotificationSchema);

export default Notification;
