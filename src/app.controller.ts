import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  UploadedFiles,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './src/files',
        filename: (req, file, callback) => {
          return callback(null, file.originalname);
        },
      }),
    }),
  )
  create(@Body() object: any, @UploadedFiles() files: any[]) {
    const file = files[0];
    console.log(file);

    return {
      message: 'success',
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('file')
  async contentFiles() {
    return await this.appService.contentFiles();
  }
  @Get('files/:fileId')
  sendFile(@Param('fileId') fileId: string, @Res() res: Response) {
    fs.access('/files/' + fileId, fs.constants.F_OK, (err) => {
      if (err) {
        res.download('./src/files/test.txt', 'test.txt');
        res.sendFile('/files/test.txt', { root: 'src' });
        // Handle the case where the file does not exist
      } else {
        res.download('./src/files/' + fileId, fileId);
        res.sendFile('/files/' + fileId, { root: 'src' });
        // Handle the case where the file exists
      }
    });
  }
}
