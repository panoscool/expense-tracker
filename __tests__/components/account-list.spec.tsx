import { render, screen, waitFor } from '@testing-library/react';
import AccountList from '../../components/account/account-list';

test('account list component', async () => {
  render(<AccountList />);

  const textElement = await waitFor(() => screen.getByRole('contentinfo'));
  const buttonElement = await waitFor(() => screen.getByText('Add'));

  expect(textElement).toHaveTextContent('Accounts');
  expect(buttonElement).toHaveTextContent('Add');
});
