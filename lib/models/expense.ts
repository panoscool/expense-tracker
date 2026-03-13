import { model, Schema, Model, SchemaTypes, models, Types } from 'mongoose';

interface IHistory {
  date: Date;
  amount: number;
  details: string;
  description: string;
  user: Types.ObjectId | string;
}

interface IExpense {
  _id: string;
  user: Types.ObjectId | string;
  account: string;
  category: string;
  date: Date;
  amount: number;
  details: string;
  description: string;
  history: IHistory[];
  created_by: Types.ObjectId | string;
  updated_by: Types.ObjectId | string;
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

const ExpenseModel: Model<IExpense> = models.Expense || model('Expense', ExpenseSchema);

export default ExpenseModel;
