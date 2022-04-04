import { FileUpload } from '@liftoffjs/core';
import { Controller, Post, UploadedFiles } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Post()
  @FileUpload('files')
  uploadFile(@UploadedFiles() files: Array<File>) {
    console.log(files);
  }
}