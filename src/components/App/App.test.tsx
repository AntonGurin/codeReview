// Do import App from './App' instead of './index'
// Do import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';
// Do screen.getByText with type <HTMLLinkElement>
// For solving types errors - just add "types": ["@testing-library/jest-dom"] in ts.config.json into compilerOptions 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/All right reserved/i);
  expect(linkElement).toBeInTheDocument();
});
