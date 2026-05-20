import { render, screen } from '@testing-library/react';
import Card from '../card';

const mockCard = {
  title: 'Rick Sanchez',
  description: 'Human | Alive',
};

test('Card renders title and description', () => {
  render(<Card title={mockCard.title} description={mockCard.description} />);

  expect(
    screen.getByRole('heading', { name: mockCard.title })
  ).toBeInTheDocument();
  expect(screen.getByText(mockCard.description)).toBeInTheDocument();
});
