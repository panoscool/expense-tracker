import { model, Schema, Model, Document, SchemaTypes, models } from 'mongoose';

interface IExpense extends Document {
  _id: string;
  user_id: string;
  date: Date;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user_id: { type: String, required: true },
    users: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    date: { type: Date, required: true },
    account: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    description: { type: String },
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
