// components/ResumeEditor.js
import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeEditor = ({ onSave, resumeData: initialData }) => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const resumeRef = useRef();

  useEffect(() => {
    if (initialData) {
      setResumeData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleSave = () => {
    console.log('Save button clicked');
    onSave(resumeData);
  };

  const handleSaveAsPDF = async () => {
    console.log('Save as PDF button clicked');
    const input = resumeRef.current;

    try {
      const canvas = await html2canvas(input, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF: ', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Edit Resume
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={resumeData.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={resumeData.address}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Summary"
            name="summary"
            value={resumeData.summary}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Experience"
            name="experience"
            value={resumeData.experience}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Education"
            name="education"
            value={resumeData.education}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Skills"
            name="skills"
            value={resumeData.skills}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Resume
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveAsPDF}
            style={{ marginLeft: 8 }}
          >
            Save as PDF
          </Button>
        </Grid>
      </Grid>
      <div style={{ display: 'none' }}>
        <div ref={resumeRef}>
          <Typography variant="h4">{resumeData.name}</Typography>
          <Typography variant="subtitle1">{resumeData.email}</Typography>
          <Typography variant="subtitle1">{resumeData.phone}</Typography>
          <Typography variant="subtitle1">{resumeData.address}</Typography>
          <Typography variant="h6">Summary</Typography>
          <Typography>{resumeData.summary}</Typography>
          <Typography variant="h6">Experience</Typography>
          <Typography>{resumeData.experience}</Typography>
          <Typography variant="h6">Education</Typography>
          <Typography>{resumeData.education}</Typography>
          <Typography variant="h6">Skills</Typography>
          <Typography>{resumeData.skills}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default ResumeEditor;
