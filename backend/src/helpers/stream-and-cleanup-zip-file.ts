import * as fs from 'fs';
import removeFile from './remove-file';

const streamAndCleanupZipFile = async (zipOutputPath: string, res: any, filePaths: string[], filePath: string) => {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="downloaded.zip"');
  
    const fileStream = fs.createReadStream(zipOutputPath);
    fileStream.pipe(res);
  
    fileStream.on('finish', async () => {
      try {
        await Promise.all([removeFile(zipOutputPath), removeFile(filePath), ...filePaths.map(removeFile)]);
      } catch (error) {
        console.error('Error removing files after streaming:', error);
      }
    });
  
    fileStream.on('error', async (error: Error) => {
      console.error('Error reading the ZIP file:', error);
      res.status(500).send('Error reading the ZIP file: ' + error.message);
      try {
        await removeFile(zipOutputPath);
      } catch (cleanupError) {
        console.error('Error cleaning up the zip file:', cleanupError);
      }
    });
  };

  export default streamAndCleanupZipFile;
  