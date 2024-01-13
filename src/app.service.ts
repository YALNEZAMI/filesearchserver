import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AppService {
  private cf: string = 'yes';
  constructor() {
    const folderPath = './src/files';
    const filePath = './src/files/result.txt';
    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }
    // Use fs.truncate to empty the file
    fs.truncate(filePath, 0, (err) => {
      if (err) {
        console.error('Error emptying file:', err);
        return;
      }
      console.log('File emptied successfully');
    });
    // setTimeout(() => {
    // Read files in the folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return;
      }

      const concatenatedContent = [];

      // Read and concatenate each file
      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        concatenatedContent.push(fileContent);
      });

      // Write the concatenated content to the output file
      fs.writeFileSync(filePath, concatenatedContent.join('\n'), 'utf-8');
      console.log('Files have been concatenated and written to', filePath);
    });
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return 'Error reading file';
      } else {
        this.cf = data;
      }
    });
    //     ,5000;
    // });
  }
  getHello(): string {
    return 'Hello World!';
  }

  contentFiles(): any {
    return this.cf;
  }
}
