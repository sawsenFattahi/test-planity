import { Request, Response } from 'express';
import spreadCsvByColumnAndZip from '../helpers/spread-csv-by-column-and-zip';

export const csvController = async (req: Request, res: Response) => {
  console.log('csvController started');
  const { column } = req.body;
  const file = req.file;

  if (!column) {
    return res.status(400).send('No column name provided');
  }
  
  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    console.log('File validation passed');
    if (!file.mimetype || !file.mimetype.includes('csv')) {
      return res.status(400).send('Uploaded file is not a CSV file');
    }

    console.log('Calling spreadCsvByColumnAndZip');
    const outputFolder = './outputcsv'; // Folder where new CSV files will be saved
    const zipOutputPath = './outputcsv.zip';
    const inputFilePath = './uploads';

    await spreadCsvByColumnAndZip(
      file.filename,
      column,
      outputFolder,
      inputFilePath,
      zipOutputPath,
      res
    );

    console.log('Sending success response');
  } catch (error) {
    res.status(500).send('Error during file processing. Please try again.');
  }
};
