import { Document, model, Model, models, Schema, SchemaTypes } from 'mongoose';

interface IPayment extends Document {
  _id: string;
  account: string;
  period: string;
  settled: boolean;
  giving_users: { amount: number; user: Document['_id'] }[];
  receiving_users: { amount: number; user: Document['_id'] }[];
  created_by: Document['_id'];
  updated_by: Document['_id'];
  created_at: Date;
  updated_at: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    account: { type: String, required: true },
    period: { type: String, required: true },
    settled: { type: Boolean, required: true, default: false },
    giving_users: [
      {
        amount: { type: Number, required: true },
        user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
      },
    ],
    receiving_users: [
      {
        amount: { type: Number, required: true },
        user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
      },
    ],
    created_by: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    updated_by: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Payment: Model<IPayment> = models.Payment || model('Payment', PaymentSchema);

export default Payment;
