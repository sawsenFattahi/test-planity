import * as fs from 'fs';

const removeFile = async (filePath: string) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (err) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }

  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      throw new Error(`The path is a directory, not a file: ${filePath}`);
    }

    await fs.promises.unlink(filePath);
    console.log(`Successfully deleted file: ${filePath}`);
  } catch (err: any) {
    if (err.code === 'EACCES') {
      console.error(`Permission denied: Unable to delete file at ${filePath}`);
    } else if (err.code === 'ENOENT') {
      console.error(`File not found: ${filePath}`);
    } else if (err.code === 'EBUSY') {
      console.error(`File is in use and cannot be deleted: ${filePath}`);
    } else {
      console.error(`Failed to delete file: ${filePath}`);
    }
  }
};

export default removeFile;
