import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${uniqueSuffix}.${fileExtension}`;
      callback(null, filename);
    },
  }),
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);

    if (ext !== '.csv') {
      return callback(
        new HttpException('Only csv are allowed', HttpStatus.BAD_REQUEST),
        false,
      );
    }
    if (file.size > 100000000) {
      return callback(
        new HttpException(
          'File size must be less than 100MB',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }

    callback(null, true);
  },
};
