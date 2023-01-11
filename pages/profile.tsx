import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ProfileForm } from '../components/profile/profile-form';
import { UploadForm } from '../components/profile/upload-form';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';

const Profile: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);
  const [expanded, setExpanded] = useState<string | false>('panel1');

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Head>
        <title>Expense Tracker - Profile</title>
        <meta name="description" content="User profile" />
      </Head>

      <Layout>
        <Box maxWidth={600} margin="0 auto">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography>Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProfileForm />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
              <Typography>Image</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UploadForm />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Layout>
    </div>
  );
};

export default Profile;
