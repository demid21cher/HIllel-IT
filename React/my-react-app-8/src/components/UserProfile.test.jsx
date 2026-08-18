import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import { test } from 'vitest';

describe('UserProfile', () => {
  test('renders loading state initially', () => {
    render(<UserProfile />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders user data after fetching', async () => {
    render(<UserProfile />);
    const userName = await screen.findByText(/Leanne Graham/i);
    const email = await screen.findByText(/Sincere@april.biz/i);
    expect(userName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('renders no user data message when user is null', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      })
    );

    render(<UserProfile />);

    const noUserMessage = await screen.findByText(/No user data available./i);

    expect(noUserMessage).toBeInTheDocument();
  });
});
