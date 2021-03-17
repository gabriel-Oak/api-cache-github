import { Request } from 'express';
import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { HttpError } from '../utils/errors';
const filesPath = path.resolve(__dirname, '..', 'tmp', 'uploads');

const fileFilter = (
  _req: Request, file: Express.Multer.File, cb: FileFilterCallback,
) => {
  const allowedFormats = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
  ];
  return allowedFormats.includes(file.mimetype)
    ? cb(null, true)
    : cb(new HttpError({
      message: 'Formato de arquivo inválido!',
      statusCode: 400,
    }));
}

const destination = (
  _req: Request,
  _file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void,
) => {
  return cb(null, filesPath);
}

const filename = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, fileName: string) => void,
) => {
  const { userId } = req.headers;
  cb(null, `${userId}-cover.${file.mimetype.split('/')[1]}`);
}

export default multer({
  dest: filesPath,
  storage: multer.diskStorage({
    destination,
    filename,
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
}).single('cover');