// models/Resume.js
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  phone: String,
  address: String,
  summary: String,
  experience: String,
  education: String,
  skills: String,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
