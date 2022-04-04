import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { LiftoffConfig } from '../../common';

export const FileUpload = (fieldName: string, maxCount?: number, localOptions?: MulterOptions) => applyDecorators(UseInterceptors(FilesInterceptor(fieldName, maxCount, {
  ...(localOptions || {}),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, LiftoffConfig.instance.storage.rootPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${randomUUID()}_${file.originalname}`);
    }
  })
})));