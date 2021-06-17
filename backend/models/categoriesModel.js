import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Categories = mongoose.model('Categories', categoriesSchema);
export default Categories;