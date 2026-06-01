import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugButton from '../bugButton';
import ErrorBoundary from '../../errorBoundary/errorBoundary';

describe('BugButton', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  test('renders a button labelled "Throw error"', () => {
    render(<BugButton />);

    expect(
      screen.getByRole('button', { name: 'Throw error' })
    ).toBeInTheDocument();
  });

  test('clicking the button triggers the surrounding ErrorBoundary', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <BugButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Throw error' }));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
