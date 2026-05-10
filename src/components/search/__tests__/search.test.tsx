import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../search';

describe('Search', () => {
  test('renders input and search button', () => {
    render(<Search initialValue="" onSearch={jest.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Search' })
    ).toBeInTheDocument();
  });

  test('pre-fills input with initialValue prop', () => {
    render(<Search initialValue="rick" onSearch={jest.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('rick');
  });

  test('shows empty input when initialValue is empty', () => {
    render(<Search initialValue="" onSearch={jest.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('updates input value as the user types', async () => {
    const user = userEvent.setup();
    render(<Search initialValue="" onSearch={jest.fn()} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'morty');

    expect(input).toHaveValue('morty');
  });

  test('calls onSearch with current input value when Search is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<Search initialValue="" onSearch={onSearch} />);

    await user.type(screen.getByRole('textbox'), 'rick');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('rick');
  });
});
