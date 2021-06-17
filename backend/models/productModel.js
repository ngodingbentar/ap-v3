import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    author: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    weight: { type: Number, required: false },
    numberOfPage: { type: Number, required: false },
    publisher: { type: String, required: false },
    countInStock: { type: Number, required: false },
    isRecomendation: { type: Boolean, default: false, required: false },
    isPacket: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
