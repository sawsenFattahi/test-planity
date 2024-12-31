import * as fs from 'fs';
import csv from 'csv-parser';

const readAndGroupCsvData = (
  filePath: string,
  columnName: string
): Promise<{ [key: string]: any[] }> => {
  return new Promise((resolve, reject) => {
    const groupedData: { [key: string]: any[] } = {};
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on('data', (data) => {
        const key = data[columnName];
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(data);
      })
      .on('end', () => resolve(groupedData))
      .on('error', (err) => reject(err));
  });
};

export default readAndGroupCsvData;
