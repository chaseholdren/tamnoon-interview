import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AssetsTable } from './AssetsTable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>;
};

describe('<AssetsTable />', () => {
  test('AssetsTable mounts properly', () => {
    const wrapper = render(<AssetsTable />, { wrapper: AllTheProviders });
    expect(wrapper).toBeTruthy();

    const text = screen.getByText('Filters');
    expect(text.textContent).toBeTruthy();
  });
});
