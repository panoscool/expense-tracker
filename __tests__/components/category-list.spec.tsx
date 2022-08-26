import { render, screen, waitFor } from '@testing-library/react';
import CategoryList from '../../components/category/category-list';

test('get categories', async () => {
  render(<CategoryList />);

  const out = await waitFor(() => screen.getByRole('contentinfo'));

  expect(out).toHaveTextContent('Categories');
});
