// pages/resume.js
import withAuth from '../../utils/withAuth.js';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ResumeEditor from '../../components/ResumeEditor.js';
import { useRouter } from 'next/router';

const ResumePage = () => {
  const { data: session } = useSession();
  const [resumeData, setResumeData] = useState(null);
  const router = useRouter();
  const isGuest = router.query.guest === 'true';

  useEffect(() => {
    if (session) {
      fetch(`/api/loadResume?userId=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setResumeData(data.data));
    }
  }, [session]);

  const handleSave = (data) => {
    if (session) {
      fetch('/api/saveResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.email, data }),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message));
    } else if (isGuest) {
      localStorage.setItem('guestResume', JSON.stringify(data));
      alert('Resume data saved locally for guest user.');
    }
  };

  useEffect(() => {
    if (isGuest) {
      const guestData = JSON.parse(localStorage.getItem('guestResume'));
      if (guestData) {
        setResumeData(guestData);
      }
    }
  }, [isGuest]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Build Your Resume
      </Typography>
      <ResumeEditor onSave={handleSave} resumeData={resumeData} />
    </Container>
  );
};

export default withAuth(ResumePage);
