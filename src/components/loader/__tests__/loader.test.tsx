import { render, screen } from '@testing-library/react';
import Loader from '../loader';

test('Loader renders with accessible label', () => {
  render(<Loader />);
  expect(screen.getByRole('status', { name: /Loading/ })).toBeInTheDocument();
});
