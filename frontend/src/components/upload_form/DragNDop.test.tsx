import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DragNdrop from './DragNDrop'
import React from 'react';

// Mocking the custom hooks and components
jest.mock('../../helpers/useFileUpload', () => ({
  __esModule: true,
  default: () => ({
    file: null,
    status: 'initial',
    progress: 0,
    downloadLink: '',
    message: '',
    handleStatus: jest.fn(),
    handleProgress: jest.fn(),
    handleDownloadLink: jest.fn(),
    handleFileChange: jest.fn(),
    handleDrop: jest.fn(),
    handleRemoveFile: jest.fn(),
    handleMessage: jest.fn(),
    inputValue: '',
  }),
}));

jest.mock('../../styles/styledComponents', () => ({
  DocumentUploader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  BrowseBtn: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  UploadInfo: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Example of a mock for FileDetails and FileAction
jest.mock('../file_details/FileDetails', () => ({
  __esModule: true,
  default: () => <div>Mocked FileDetails</div>,
}));

jest.mock('../file_actions/FileAction', () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe('DragNdrop Component', () => {
  it('renders correctly', () => {
    render(<DragNdrop />);
    
    // Check if upload message is shown
    expect(screen.getByText(/Drag and drop your CSV files here/i)).toBeInTheDocument();
    expect(screen.getByText(/Limit 15MB per file./i)).toBeInTheDocument();
    expect(screen.getByText(/Browse files/i)).toBeInTheDocument();
  });

  it('shows the file details after file is selected', async () => {
    // You may need to mock the useFileUpload hook to simulate the file selection
    const mockHandleFileChange = jest.fn();
    jest.mock('../../helpers/useFileUpload', () => ({
      __esModule: true,
      default: () => ({
        file: { name: 'test.csv' },
        status: 'initial',
        progress: 0,
        downloadLink: '',
        message: '',
        handleStatus: jest.fn(),
        handleProgress: jest.fn(),
        handleDownloadLink: jest.fn(),
        handleFileChange: mockHandleFileChange,
        handleDrop: jest.fn(),
        handleRemoveFile: jest.fn(),
        handleMessage: jest.fn(),
        inputValue: '',
      }),
    }));

    render(<DragNdrop />);
    
    // Simulate file change
    const fileInput = screen.getByLabelText('Browse files') as HTMLInputElement;
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // After the file is selected, check if file details are rendered
    await waitFor(() => {
      expect(screen.getByText(/Mocked FileDetails/)).toBeInTheDocument();
    });
  });

  it('displays success message when file compression is successful', async () => {
    // Simulating a successful compression
    const mockHandleStatus = jest.fn();
    const mockHandleProgress = jest.fn();
    const mockHandleDownloadLink = jest.fn();

    jest.mock('../../helpers/useFileUpload', () => ({
      __esModule: true,
      default: () => ({
        file: { name: 'test.csv' },
        status: 'success',
        progress: 100,
        downloadLink: 'some-download-link.zip',
        message: 'File Compressed Successfully',
        handleStatus: mockHandleStatus,
        handleProgress: mockHandleProgress,
        handleDownloadLink: mockHandleDownloadLink,
        handleFileChange: jest.fn(),
        handleDrop: jest.fn(),
        handleRemoveFile: jest.fn(),
        handleMessage: jest.fn(),
        inputValue: '',
      }),
    }));

    render(<DragNdrop />);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('File Compressed Successfully')).toBeInTheDocument();
      expect(screen.getByText('Download ZIP file')).toBeInTheDocument();
    });
  });

  it('displays error message when file compression fails', async () => {
    // Simulating a failed compression
    const mockHandleStatus = jest.fn();
    const mockHandleProgress = jest.fn();

    jest.mock('../../helpers/useFileUpload', () => ({
      __esModule: true,
      default: () => ({
        file: { name: 'test.csv' },
        status: 'fail',
        progress: 0,
        downloadLink: '',
        message: 'File Compression Failed',
        handleStatus: mockHandleStatus,
        handleProgress: mockHandleProgress,
        handleDownloadLink: jest.fn(),
        handleFileChange: jest.fn(),
        handleDrop: jest.fn(),
        handleRemoveFile: jest.fn(),
        handleMessage: jest.fn(),
        inputValue: '',
      }),
    }));

    render(<DragNdrop />);

    // Check for failure message
    await waitFor(() => {
      expect(screen.getByText('File Compression Failed')).toBeInTheDocument();
    });
  });

  it('shows progress bar during file compression', async () => {
    // Simulating file compression progress
    jest.mock('../../helpers/useFileUpload', () => ({
      __esModule: true,
      default: () => ({
        file: { name: 'test.csv' },
        status: 'initial',
        progress: 50,
        downloadLink: '',
        message: '',
        handleStatus: jest.fn(),
        handleProgress: jest.fn(),
        handleDownloadLink: jest.fn(),
        handleFileChange: jest.fn(),
        handleDrop: jest.fn(),
        handleRemoveFile: jest.fn(),
        handleMessage: jest.fn(),
        inputValue: '',
      }),
    }));

    render(<DragNdrop />);

    // Check for progress bar
    await waitFor(() => {
      expect(screen.getByText('Mocked FileDetails')).toBeInTheDocument();
    });
  });
});
