import readAndGroupCsvData from './read-and-group-csv-data';
import writeGroupedDataToCsv from './write-grouped-data-to-csv';
import createZipFromCsvFiles from './create-zip-from-csv-files';
import streamAndCleanupZipFile from './stream-and-cleanup-zip-file';

const spreadCsvByColumnAndZip = async (
  fileName: string,
  columnName: string,
  outputFolder: string,
  inputFilePath: string,
  zipOutputPath: string,
  res: any
) => {
  const filePath = `${inputFilePath}/${fileName}`;

  try {
    const groupedData = await readAndGroupCsvData(filePath, columnName);

    if (Object.keys(groupedData).length === 0) {
      console.warn(`No data was grouped for column "${columnName}".`);
      res.status(400).send(`No data was grouped for column "${columnName}". Please check your CSV file.`);
      return;
    }

    const filePaths = await writeGroupedDataToCsv(groupedData, outputFolder);

    await createZipFromCsvFiles(filePaths, zipOutputPath);

    await streamAndCleanupZipFile(zipOutputPath, res, filePaths, filePath);
  } catch (error: any) {
    console.error('Error processing CSV and creating ZIP:', error);
    res.status(500).send('Error processing CSV and creating ZIP: ' + error.message);
  }
};

export default spreadCsvByColumnAndZip;
