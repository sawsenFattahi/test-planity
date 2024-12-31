import spreadCsvByColumnAndZip from '../../helpers/spread-csv-by-column-and-zip';
import readAndGroupCsvData from '../../helpers/read-and-group-csv-data';
import writeGroupedDataToCsv from '../../helpers/write-grouped-data-to-csv';
import createZipFromCsvFiles from '../../helpers/create-zip-from-csv-files';
import streamAndCleanupZipFile from '../../helpers/stream-and-cleanup-zip-file';



jest.mock('../../helpers/read-and-group-csv-data');
jest.mock('../../helpers/write-grouped-data-to-csv');
jest.mock('../../helpers/create-zip-from-csv-files');
jest.mock('../../helpers/stream-and-cleanup-zip-file');

describe('spreadCsvByColumnAndZip', () => {
    const fileName = 'data.csv';
    const columnName = 'category';
    const outputFolder = '/output';
    const inputFilePath = '/input';
    const zipOutputPath = '/output/zip';
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should process the CSV, create ZIP, and stream the result', async () => {
      const groupedData = { category1: [{}, {}], category2: [{}] };
      const filePaths = ['/output/category1.csv', '/output/category2.csv'];
  
      (readAndGroupCsvData as unknown as jest.Mock).mockResolvedValueOnce(groupedData);
      (writeGroupedDataToCsv as unknown as jest.Mock).mockResolvedValueOnce(filePaths);
      (createZipFromCsvFiles as unknown as jest.Mock).mockResolvedValueOnce(undefined); // Pas de valeur de retour pour createZip
      (streamAndCleanupZipFile as unknown as jest.Mock).mockResolvedValueOnce(undefined); // Pas de valeur de retour pour stream
  
      await spreadCsvByColumnAndZip(fileName, columnName, outputFolder, inputFilePath, zipOutputPath, res);
  
      expect(readAndGroupCsvData).toHaveBeenCalledWith(`${inputFilePath}/${fileName}`, columnName);
      expect(writeGroupedDataToCsv).toHaveBeenCalledWith(groupedData, outputFolder);
      expect(createZipFromCsvFiles).toHaveBeenCalledWith(filePaths, zipOutputPath);
      expect(streamAndCleanupZipFile).toHaveBeenCalledWith(zipOutputPath, res, filePaths, `${inputFilePath}/${fileName}`);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle errors and send an error response', async () => {
      const errorMessage = 'Error processing CSV and creating ZIP';
      const error = new Error(errorMessage);
  
      (readAndGroupCsvData as unknown as jest.Mock).mockRejectedValueOnce(error);
  
      await spreadCsvByColumnAndZip(fileName, columnName, outputFolder, inputFilePath, zipOutputPath, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(`Error processing CSV and creating ZIP: ${errorMessage}`);
    });
  
    it('should call the correct functions even when one step fails', async () => {
      const groupedData = { category1: [{}], category2: [{}] };
      const filePaths = ['/output/category1.csv', '/output/category2.csv'];
  
      (readAndGroupCsvData as unknown as jest.Mock).mockResolvedValueOnce(groupedData);
      (writeGroupedDataToCsv as unknown as jest.Mock).mockResolvedValueOnce(filePaths);
      (createZipFromCsvFiles as unknown as jest.Mock).mockRejectedValueOnce(new Error('ZIP creation failed'));
  
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
      await spreadCsvByColumnAndZip(fileName, columnName, outputFolder, inputFilePath, zipOutputPath, res);
  
      expect(readAndGroupCsvData).toHaveBeenCalledWith(`${inputFilePath}/${fileName}`, columnName);
      expect(writeGroupedDataToCsv).toHaveBeenCalledWith(groupedData, outputFolder);
      expect(createZipFromCsvFiles).toHaveBeenCalledWith(filePaths, zipOutputPath);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error processing CSV and creating ZIP:', expect.any(Error));
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error processing CSV and creating ZIP: ZIP creation failed');
    });
  });