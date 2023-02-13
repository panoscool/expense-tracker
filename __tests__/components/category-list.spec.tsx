import { render, screen, waitFor } from '@testing-library/react';
import { CategoryList } from '../../components/category/category-list';

test('category list component', async () => {
  render(<CategoryList />);

  const textElement = await waitFor(() => screen.getByRole('contentinfo'));
  const buttonElement = await waitFor(() => screen.getByText('Add'));

  expect(textElement).toHaveTextContent('Categories');
  expect(buttonElement).toHaveTextContent('Add');
});
