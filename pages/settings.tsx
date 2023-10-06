import { AddRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, IconButton, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { AccountForm } from '../components/account/account-form';
import { AccountList } from '../components/account/account-list';
import { AccountUsers } from '../components/account/account-users';
import { CategoryForm } from '../components/category/category-form';
import { CategoryList } from '../components/category/category-list';
import PageTitle from '../components/page-title';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';
import { Account } from '../lib/interfaces/account';
import { UseCaseType } from '../lib/interfaces/common';

const Profile: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth();
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [open, setOpen] = useState<UseCaseType | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const openCategoryForm = open === UseCaseType.category_create;
  const openAccountView = open === UseCaseType.account_view;
  const openAccountForm = open === UseCaseType.account_create || open === UseCaseType.account_edit;

  useEffect(() => {
    checkAuthStateAndRedirect();
  }, [checkAuthStateAndRedirect]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpen = (useCase: UseCaseType, account?: Account) => (e: React.MouseEvent) => {
    e.stopPropagation();

    if (account) setSelectedAccount(account);

    setOpen(useCase);
  };

  const handleClose = () => {
    if (selectedAccount) setSelectedAccount(null);

    setOpen(null);
  };

  if (!authenticated) return null;

  return (
    <div>
      <PageTitle page="settings" />

      <Layout>
        <Container maxWidth="md" sx={{ pt: 2 }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
                <Typography>Accounts</Typography>
                <IconButton
                  sx={{ mr: 2 }}
                  aria-label="create new account"
                  onClick={handleOpen(UseCaseType.account_create)}
                >
                  <AddRounded />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <AccountList onAccountSelect={handleOpen} />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel2bh-content" id="panel2bh-header">
              <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
                <Typography>Categories</Typography>
                <IconButton
                  sx={{ mr: 2 }}
                  aria-label="create new category"
                  onClick={handleOpen(UseCaseType.category_create)}
                >
                  <AddRounded />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CategoryList />
            </AccordionDetails>
          </Accordion>

          <AccountForm open={openAccountForm} useCase={open} account={selectedAccount} onClose={handleClose} />
          <AccountUsers open={openAccountView} accountId={selectedAccount?._id} onClose={handleClose} />
          <CategoryForm open={openCategoryForm} onClose={handleClose} />
        </Container>
      </Layout>
    </div>
  );
};

export default Profile;
