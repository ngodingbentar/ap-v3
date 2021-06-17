import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    nameReceiver: { type: String, required: false },
    labelAddress: { type: String, required: false },
    province: { type: String, required: false },
    provinceId: { type: String, required: false },
    city: { type: String, required: false },
    cityId: { type: String, required: false },
    postalCode: { type: Number, required: false },
    phone: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
