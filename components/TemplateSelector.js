// components/TemplateSelector.js
import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

const templates = [
  { id: 1, name: 'Template 1', preview: '/template1.png' },
  { id: 2, name: 'Template 2', preview: '/template2.png' },
];

const TemplateSelector = ({ onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    onSelect(template);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select a Template
      </Typography>
      <Grid container spacing={2}>
        {templates.map((template) => (
          <Grid item key={template.id} xs={6}>
            <Button
              variant={selectedTemplate === template.id ? 'contained' : 'outlined'}
              onClick={() => handleSelect(template)}
            >
              {template.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TemplateSelector;
