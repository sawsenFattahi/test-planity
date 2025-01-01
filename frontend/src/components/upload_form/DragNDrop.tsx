import { useRef } from 'react';
import {
  AiFillClockCircle,
  AiFillCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineCloudUpload,
} from 'react-icons/ai';
import { BrowseBtn, Button, DocumentUploader, UploadInfo } from '../../styles/styledComponents';
import compressFileApi from '../../api/compressFileApi';
import FileDetails from '../file_details/FileDetails';
import FileAction from '../file_actions/FileAction';
import ProgressBar from '../progress_bar/ProgressBar';
import useFileUpload from '../../helpers/useFileUpload';

const DragNdrop = () => {
  const inputFile = useRef(null);
  const {
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
  } = useFileUpload();

  return (
    <DocumentUploader
      className={file ? 'active' : ''}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      {/* Upload Info Section */}
      <UploadInfo>
        <AiOutlineCloudUpload />
        <div>
          <p>Drag and drop your CSV files here</p>
        </div>
      </UploadInfo>

      {/* File Input & Browse Button */}
      <input
        type='file'
        hidden
        id='browse'
        accept='.csv'
        value={inputValue}
        onChange={handleFileChange}
      />
      <Button color='blue' disabled={status === 'compressing'}>
        <BrowseBtn htmlFor='browse' className={`browse-btn ${status === 'compressing' ? 'disabled' : ''}`} ref={inputFile}>
          Browse files
        </BrowseBtn>
      </Button>

      {/* File Details Section */}
      {file && (
        <FileDetails
          file={file}
          status={status}
          handleRemoveFile={handleRemoveFile}
          handleStatus={handleStatus}
          handleProgress={handleProgress}
          handleDownloadLink={handleDownloadLink}
          handleMessage={handleMessage}
          compressFileApi={compressFileApi}
        />
      )}

      {/* Success Message */}
      {file && status === 'success' && (
        <FileAction
          status='success'
          color='#6DC24B'
          message='File Compressed Successfully'
          Icon={AiOutlineCheckCircle}
        >
          <Button color='green'>
            <a href={downloadLink} download='output.zip'>
              Download ZIP file
            </a>
          </Button>
        </FileAction>
      )}

      {/* Failure Message */}
      {file && status === 'fail' && (
        <FileAction
          status='fail'
          color='#FF0000'
          message='File Compression Failed'
          Icon={AiFillCloseCircle}
        />
      )}

      {/* Progress Bar */}
      {progress > 0 && (progress < 100) && status !== 'success' && (
        <ProgressBar progress={progress} />
      )}
      {progress === 100 && status !== 'success' && (
        <FileAction
        status='success'
        color='#6DC24B'
        message={message}
        Icon={AiFillClockCircle}
      >
      </FileAction>
      )}
    </DocumentUploader>
  );
};

export default DragNdrop;
