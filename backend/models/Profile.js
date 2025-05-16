import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    default: 'X.BOY'
  },
  description: {
    type: String,
    default: `I'm a lo-fi music producer creating mellow, nostalgic beats that turn quiet moments into soulful escapes.`
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);