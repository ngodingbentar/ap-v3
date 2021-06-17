import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;