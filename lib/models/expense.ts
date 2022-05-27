import { model, Schema, Model, Document, SchemaTypes, models } from 'mongoose';

export interface IExpense extends Document {
  _id: string;
  user_id: string;
  account_id: string;
  category: string;
  date: Date;
  amount: number;
  note: string;
  description: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user_id: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    account_id: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    note: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Expense: Model<IExpense> = models.Expense || model('Expense', ExpenseSchema);

export default Expense;
