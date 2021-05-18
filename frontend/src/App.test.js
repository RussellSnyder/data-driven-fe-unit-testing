import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders heading', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
  
  test('renders people in heading', () => {
    render(<App />);
    const header = screen.getByTestId('app-header');
    expect(header.textContent).toBe('People');
  });
})
