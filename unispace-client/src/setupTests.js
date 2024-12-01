import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(/learn react/i);
});
