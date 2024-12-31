import createZipFromCsvFiles from '../../helpers/create-zip-from-csv-files';
import createZip from '../../helpers/create-zip';

jest.mock('../../helpers/create-zip');

describe('createZipFromCsvFiles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createZip with correct parameters when no error occurs', async () => {
    const filePaths = ['file1.csv', 'file2.csv'];
    const zipOutputPath = 'output.zip';
    
    (createZip as jest.Mock).mockResolvedValueOnce(undefined);

    await createZipFromCsvFiles(filePaths, zipOutputPath);

    expect(createZip).toHaveBeenCalledTimes(1);
    expect(createZip).toHaveBeenCalledWith(filePaths, zipOutputPath);
  });

  it('should throw an error with a specific message if createZip throws an error', async () => {
    const filePaths = ['file1.csv', 'file2.csv'];
    const zipOutputPath = 'output.zip';
    const errorMessage = 'Some error occurred';

    (createZip as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(createZipFromCsvFiles(filePaths, zipOutputPath))
      .rejects
      .toThrowError(`Error creating ZIP file: ${errorMessage}`);
  });
});
