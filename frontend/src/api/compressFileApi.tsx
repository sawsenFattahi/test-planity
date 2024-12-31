/* eslint-disable no-unused-vars */
import axios from 'axios';

const compressFileApi = async (
  file: File,
  handleStatus: { (status: string): void },
  handleProgress: { (progress: number): void },
  handleDownloadLink: { (link: string): void },
  handleMessage: { (message: string): void },
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('column', 'gender');

  // Retrieve the API key and URL from environment variables
  const PARSE_API_KEY = import.meta.env.VITE_PARSE_API_KEY;
  const PARSE_API_URL = import.meta.env.VITE_PARSE_API_URL || 'http://localhost:3000/upload';

  // Set the Bearer token in the Authorization header
  const authorizationHeader = `Bearer ${PARSE_API_KEY}`;

  await handleMessage('Please wait while we process your files.');
  await handleStatus('compressing');

  try {
    // Make the API request with the Bearer token in the Authorization header
    const response = await axios.post(PARSE_API_URL, formData, {
      headers: {
        Authorization: authorizationHeader, // Use Bearer token
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          handleProgress(percentage);
        }
      },
    });

    // Create the Blob from the response and generate the download link
    const blob = new Blob([response.data], { type: 'application/zip' });
    const link = URL.createObjectURL(blob);

    await handleDownloadLink(link);

    // Update the status and progress
    await handleStatus('success');
    await handleProgress(100);
  } catch (error) {
    console.error(error);
    handleStatus('fail');
    handleMessage('Something went wrong. Please try again.');
  }
};

export default compressFileApi;
