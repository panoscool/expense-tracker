import { model, Schema, Model, Document, models } from 'mongoose';

interface ICategory extends Document {
  _id: string;
  user_id: string;
  label: string;
}

const CategorySchema: Schema = new Schema({
  _id: { type: String, required: true, auto: false },
  user_id: { type: String, required: true },
  label: { type: String, required: true },
});

const Category: Model<ICategory> = models.Category || model('Category', CategorySchema);

export default Category;
