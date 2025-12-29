import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard heading', () => {
  render(<App />);
  const heading = screen.getByText(/choose a quiz/i);
  expect(heading).toBeInTheDocument();
});
