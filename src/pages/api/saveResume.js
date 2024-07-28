// pages/api/saveResume.js
import connectDB from '../../../utils/db.js';
import Resume from '../../../models/Resume.js';

const saveResumeHandler = async (req, res) => {
  await connectDB();
  const { userId, data } = req.body;
  let resume = await Resume.findOne({ userId });
  if (resume) {
    resume.data = data;
    await resume.save();
  } else {
    resume = new Resume({ userId, data });
    await resume.save();
  }
  res.status(200).json({ message: 'Resume saved' });
};

export default saveResumeHandler;