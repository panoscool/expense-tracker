import { model, Schema, Model, Document, models, SchemaTypes } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  user_id: string;
  labels: string[];
}

const CategorySchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user_id: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    labels: [{ type: String, required: true, trim: true, unique: true }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Category: Model<ICategory> = models.Category || model('Category', CategorySchema);

export default Category;
