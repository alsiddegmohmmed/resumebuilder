// pages/api/loadResume.js
import Resume from '../../../models/Resume.js';
import connectDB from '../../../utils/db.js';

const loadResumeHandler = async (req, res) => {
  await connectDB();
  const { userId } = req.query;
  const resume = await Resume.findOne({ userId });
  if (resume) {
    res.status(200).json({ data: resume.data });
  } else {
    res.status(404).json({ message: 'Resume not found' });
  }
};

export default loadResumeHandler;