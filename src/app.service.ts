import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AppService {
  private cf: string = 'yes';
  constructor() {}
  getHello(): string {
    return 'Hello World!';
  }

  async contentFiles() {
    const folderPath = './src/files';
    const res: { name: string; content: string }[] = [];
    const files = fs.readdirSync(folderPath);

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(folderPath, files[i]);
      const content = fs.readFileSync(filePath, 'utf-8');
      res.push({ name: files[i], content });
    }
    return res;
  }
}
