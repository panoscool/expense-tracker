import { model, Schema, Model, Document, SchemaTypes, models } from 'mongoose';

interface IHistory {
  date: Date;
  amount: number;
  details: string;
  description: string;
  user: Document['_id'];
}

interface IExpense extends Document {
  _id: string;
  user: Document['_id'];
  account: string;
  category: string;
  date: Date;
  amount: number;
  details: string;
  description: string;
  history: IHistory[];
  created_by: Document['_id'];
  updated_by: Document['_id'];
  created_at: Date;
  updated_at: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    account: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    details: { type: String, trim: true },
    history: [
      {
        amount: { type: Number },
        date: { type: Date },
        description: { type: String },
        details: { type: String },
        user: { type: SchemaTypes.ObjectId, ref: 'User' },
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

const Expense: Model<IExpense> = models.Expense || model('Expense', ExpenseSchema);

export default Expense;
