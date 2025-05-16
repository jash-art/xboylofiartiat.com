// backend/models/Music.js
import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  embedCode: {
    type: String,
    required: false
  },
  embedType: {
    type: String,
    enum: ['spotify', 'soundcloud'],
    required: false
  },
  links: {
    spotify: String,
    appleMusic: String,
    soundcloud: String,
    youtube: String
  },
  latest: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Music', musicSchema);


// import mongoose from 'mongoose';

// const musicSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   releaseDate: {
//     type: String,
//     required: true
//   },
//   coverImage: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   links: {
//     spotify: String,
//     appleMusic: String,
//     soundcloud: String,
//     youtube: String
//   }, latest: {
//     type: Boolean,
//     default: false
//   },
//   featured: {
//     type: Boolean,
//     default: false
//   }
// }, { timestamps: true });

// export default mongoose.model('Music', musicSchema);