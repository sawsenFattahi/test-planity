/* eslint-disable no-unused-vars */
import axios from 'axios';
import errorHandlingMessage from '../helpers/errorHandlingMessage';

const compressFileApi = async (
  file: File,
  handleStatus: (status: string) => void,
  handleProgress: (progress: number) => void,
  handleDownloadLink: (link: string) => void,
  handleMessage: (message: string) => void,
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('column', 'gender');

  const PARSE_API_KEY = import.meta.env.VITE_PARSE_API_KEY;
  const PARSE_API_URL = import.meta.env.VITE_PARSE_API_URL || 'http://localhost:3000/upload';
  const authorizationHeader = `Bearer ${PARSE_API_KEY}`;

  handleMessage('Please wait while we process your files.');
  handleStatus('compressing');

  try {
    // Initialize upload progress
    let uploadComplete = false;
    let processingMessageShown = false;

    const response = await axios.post(PARSE_API_URL, formData, {
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
      onUploadProgress: ({ loaded, total }) => {
        if (total) {
          const percentage = Math.round((loaded * 100) / total);
          handleProgress(percentage);
          if (percentage === 100) {
            uploadComplete = true;
          }
        }
      },
    });

    // Ensure progress stays at 100% only when the download link is ready
    if (uploadComplete) {
      if (!processingMessageShown) {
        handleMessage('Processing file on server...');
        processingMessageShown = true;
      }

      const blob = new Blob([response.data], { type: 'application/zip' });
      const link = URL.createObjectURL(blob);

      handleDownloadLink(link);
      handleStatus('success');
      handleMessage('File ready for download.');
      handleProgress(100); // Finalize progress to 100% when the download link is ready
    }
  } catch (error: any) {
    const errorMessage = error.response?.status ? errorHandlingMessage[error.response.status] : 'An unexpected error occurred.';
    handleStatus('fail');
    handleMessage(errorMessage);
  }
};

export default compressFileApi;
