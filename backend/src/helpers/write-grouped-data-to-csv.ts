import * as fs from 'fs';
import { Parser } from 'json2csv';

const writeGroupedDataToCsv = (groupedData: { [key: string]: any[] }, outputFolder: string): Promise<string[]> => {
    return new Promise((resolve, _) => {
      const filePaths: string[] = [];
      Object.keys(groupedData).forEach((key) => {
        const groupData = groupedData[key];
        const outputFilePath = `${outputFolder}/${key}.csv`;
  
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(groupData);
  
        fs.writeFileSync(outputFilePath, csvData);
        filePaths.push(outputFilePath);
        console.log(`File created for group ${key}: ${outputFilePath}`);
      });
  
      resolve(filePaths);
    });
  };

  export default writeGroupedDataToCsv