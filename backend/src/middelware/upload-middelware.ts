import multer from 'multer';
import * as fs from 'fs';

const outputFolder = './outputcsv';
const inputFilePath = './uploads';
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdirSync(outputFolder, { recursive: true });
      console.log(`${outputFolder}, Directory created successfully!`);
    } catch (err) {
      console.error(`Error creating directory: ${outputFolder}, `, err);
    }

    try {
      await fs.mkdirSync(inputFilePath, { recursive: true });
      console.log(`${inputFilePath}, Directory created successfully!`);
    } catch (err) {
      console.error(`Error creating directory: ${inputFilePath}, `, err);
    }
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

export const uploadMiddleware = upload.single('file');
