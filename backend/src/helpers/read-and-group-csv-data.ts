import * as fs from 'fs';
import csv from 'csv-parser';

const readAndGroupCsvData = (
  filePath: string,
  columnName: string
): Promise<{ [key: string]: any[] }> => {
  return new Promise((resolve) => {
    const groupedData: { [key: string]: any[] } = {};
    const readStream = fs.createReadStream(filePath);

    let isColumnPresent = false;

    readStream
      .pipe(
        csv()
          .on('headers', (headers) => {
            if (headers.includes(columnName)) {
              isColumnPresent = true;
            } else {
              console.warn(`Column "${columnName}" does not exist in the CSV file.`);
            }
          })
      )
      .on('data', (data) => {
        if (isColumnPresent) {
          const key = data[columnName];
          if (!groupedData[key]) {
            groupedData[key] = [];
          }
          groupedData[key].push(data);
        }
      })
      .on('end', () => {
        if (!isColumnPresent) {
          console.warn(`No data was grouped because column "${columnName}" is missing.`);
        }
        resolve(groupedData);
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err.message);
        resolve(groupedData);
      });
  });
};

export default readAndGroupCsvData;
