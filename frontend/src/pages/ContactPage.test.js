import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ContactPage from './ContactPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('../components/SplitText', () => ({
  __esModule: true,
  default: ({ text, tag: Tag = 'div' }) => <Tag>{text}</Tag>,
}));

describe('ContactPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockResolvedValue({ data: {} });
  });

  it('submits the form successfully and shows a success message', async () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByText('Full Name').closest('div').querySelector('input'), {
      target: { name: 'name', value: 'John Doe' },
    });
    fireEvent.change(screen.getByText('Email Address').closest('div').querySelector('input'), {
      target: { name: 'email', value: 'john@example.com' },
    });
    fireEvent.change(screen.getByText('Phone Number').closest('div').querySelector('input'), {
      target: { name: 'phone', value: '1234567890' },
    });
    fireEvent.change(screen.getByText('Message').closest('div').querySelector('textarea'), {
      target: { name: 'message', value: 'Hello there' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send via whatsapp/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument();
  });
});
