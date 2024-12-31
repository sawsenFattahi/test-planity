import React, { useState } from 'react';

const useFileUpload = () => {
  const [file, setFile] = useState<File | undefined>();
  const [status, setStatus] = useState('initial');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');
  const [downloadLink, setDownloadLink] = useState<string>('');


  const handleStatus = (status: string) => setStatus(status);
  const handleProgress = (progress: number) => setProgress(progress);
  const handleDownloadLink = (link: string) => setDownloadLink(link);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setInputValue('');
    setFile(undefined);
    setStatus('initial');
  };

  const handleMessage = (message: string) => setMessage(message);

  return {
    file,
    status,
    progress,
    downloadLink,
    message,
    handleStatus,
    handleProgress,
    handleDownloadLink,
    handleFileChange,
    handleDrop,
    handleRemoveFile,
    handleMessage,
    inputValue,
  };
};

export default useFileUpload;