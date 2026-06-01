import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About', () => {
  test('renders heading and RS School link', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: 'About' })
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /RS School React course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
