import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';

const createZip = (files: string[], outputPath: string) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const output = fs.createWriteStream(outputPath);

  return new Promise<void>((resolve, reject) => {
    files.forEach((file) => {
      if (!fs.existsSync(file)) {
        return reject(new Error(`File not found: ${file}`));
      }
      if (!fs.statSync(file).isFile()) {
        return reject(new Error(`Not a valid file: ${file}`));
      }
    });

    try {
      files.forEach((file) => fs.accessSync(file, fs.constants.R_OK));
    } catch (error) {
      return reject(new Error(`Permission denied for reading one or more files`));
    }

    try {
      fs.accessSync(path.dirname(outputPath), fs.constants.W_OK);
    } catch (error) {
      return reject(new Error(`Permission denied to write to the output path: ${outputPath}`));
    }

    archive.pipe(output);

    archive.on('end', resolve);
    archive.on('error', (err) => {
      reject(new Error(`Archiver error: ${err.message}`));
    });

    files.forEach((file) => archive.file(file, { name: path.basename(file) }));

    archive.finalize();

    output.on('error', (err) => {
      reject(new Error(`Error writing to output file: ${err.message}`));
    });
  });
};

export default createZip;
