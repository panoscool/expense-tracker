import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import PageTitle from '../components/page-title';
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

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!authenticated) return null;

  return (
    <div>
      <PageTitle page="profile" />

      <Layout>
        <Container maxWidth="md" sx={{ pt: 2 }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography>Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProfileForm />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel2bh-content" id="panel2bh-header">
              <Typography>Image</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UploadForm />
            </AccordionDetails>
          </Accordion>
        </Container>
      </Layout>
    </div>
  );
};

export default Profile;
