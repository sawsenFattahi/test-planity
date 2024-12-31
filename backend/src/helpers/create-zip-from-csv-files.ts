import createZip from './create-zip';

const createZipFromCsvFiles = async (filePaths: string[], zipOutputPath: string): Promise<void> => {
    try {
      await createZip(filePaths, zipOutputPath);
    } catch (error: any) {
      throw new Error('Error creating ZIP file: ' + error.message);
    }
  };

  export default createZipFromCsvFiles;