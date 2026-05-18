import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../pagination';

describe('Pagination', () => {
  test('renders Previous, Next, and current page', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Previous' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  test('disables Previous on the first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  test('calls onPageChange with the new page when Next is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(
      <Pagination page={2} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
