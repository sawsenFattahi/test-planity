import request from 'supertest';
import express from 'express';
import multer from 'multer';
import { csvController } from '../../controllers/csv-controller';
import spreadCsvByColumnAndZip from '../../helpers/spread-csv-by-column-and-zip';

const app = express();

const upload = multer({ dest: './uploads' });

jest.mock('../../helpers/spread-csv-by-column-and-zip');

app.post('/upload', upload.single('file'), csvController);

describe('uploadCsv', () => {
  it('should return 400 if no column is provided', async () => {
    console.log('Test 1: No column provided');
    const res = await request(app)
      .post('/upload')
      .field('column', '')  
      .attach('file', Buffer.from('test,file\n1,2\n3,4'), 'test.csv');

    console.log('Response:', res.text);
    expect(res.status).toBe(400);
    expect(res.text).toBe('No column name provided');
  });

  it('should return 400 if no file is uploaded', async () => {
    console.log('Test 2: No file uploaded');
    const res = await request(app)
      .post('/upload')
      .field('column', 'someColumn');

    console.log('Response:', res.text);
    expect(res.status).toBe(400);
    expect(res.text).toBe('No file uploaded');
  });

  it('should return 400 if the uploaded file is not a CSV file', async () => {
    console.log('Test 3: Non-CSV file uploaded');
    const res = await request(app)
      .post('/upload')
      .field('column', 'someColumn')
      .attach('file', Buffer.from('test,text\n1,2\n3,4'), 'test.txt');

    console.log('Response:', res.text);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Uploaded file is not a CSV file');
  });

  it('should call spreadCsvByColumnAndZip and return 500 if there is an error during processing', async () => {
    console.log('Test 4: Error during processing');
    const column = 'someColumn';

    (spreadCsvByColumnAndZip as jest.Mock).mockRejectedValue(new Error('Processing error'));

    const res = await request(app)
      .post('/upload')
      .field('column', column)
      .attach('file', Buffer.from('test,file\n1,2\n3,4'), 'test.csv');

    console.log('Response:', res.text);
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error during file processing. Please try again.');
  });

 /* it('should process the CSV file successfully and return 200', async () => {
    const column = 'someColumn';

    const tempFilePath = path.join(__dirname, 'tempfile.csv');
    const tempFileContent = 'column1,column2\nvalue1,value2';
    fs.writeFileSync(tempFilePath, tempFileContent);

    (spreadCsvByColumnAndZip as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app)
      .post('/upload')
      .field('column', column)
      .attach('file', tempFilePath);

    expect(res.status).toBe(200);
  });*/
});
