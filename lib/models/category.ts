import { model, Schema, Model, Document, models, SchemaTypes } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  user: Document['_id'];
  labels: string[];
  created_at: Date;
  updated_at: Date;
}

const CategorySchema: Schema = new Schema(
  {
    _id: { type: String, required: true, auto: false },
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    labels: [{ type: String, required: true, trim: true }],
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
