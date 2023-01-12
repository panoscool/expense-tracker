import { AddRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container, IconButton } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { AccountForm } from '../components/account/account-form';
import { AccountList } from '../components/account/account-list';
import { AccountUsers } from '../components/account/account-users';
import { CategoryForm } from '../components/category/category-form';
import { CategoryList } from '../components/category/category-list';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';
import { Account } from '../lib/interfaces/account';
import { UseCaseType } from '../lib/interfaces/common';

const Profile: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [open, setOpen] = useState<UseCaseType | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const openAccountForm = useMemo(
    () => open === UseCaseType.account_create || open === UseCaseType.account_edit,
    [open],
  );
  const openCategoryForm = useMemo(() => open === UseCaseType.category_create, [open]);
  const openAccountView = useMemo(() => open === UseCaseType.account_view, [open]);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

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

  return (
    <div>
      <Head>
        <title>Expense Tracker - Settings</title>
        <meta name="description" content="User profile" />
      </Head>

      <Layout>
        <Container maxWidth="md">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
                <Typography>Accounts</Typography>
                <IconButton sx={{ mr: 2 }} onClick={handleOpen(UseCaseType.account_create)}>
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
                <IconButton sx={{ mr: 2 }} onClick={handleOpen(UseCaseType.category_create)}>
                  <AddRounded />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CategoryList />
            </AccordionDetails>
          </Accordion>

          <AccountForm open={openAccountForm} useCase={open} account={selectedAccount} onClose={handleClose} />
          <AccountUsers open={openAccountView} account={selectedAccount} onClose={handleClose} />
          <CategoryForm open={openCategoryForm} onClose={handleClose} />
        </Container>
      </Layout>
    </div>
  );
};

export default Profile;
