import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the clock', () => {
  render(<App />);
  const linkElement = screen.getByText(/until/i);
  expect(linkElement).toBeInTheDocument();
});
