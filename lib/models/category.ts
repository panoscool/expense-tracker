import { model, Schema, Model, models, SchemaTypes, Types } from 'mongoose';

interface ICategory {
  _id: string;
  user: Types.ObjectId | string;
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

const CategoryModel: Model<ICategory> = models.Category || model('Category', CategorySchema);

export default CategoryModel;
