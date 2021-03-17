import { HttpError } from '../../utils/errors';

export const insertCoverScope = ({ cover }: { cover: string }) => {
  if (!cover) throw new HttpError({
    statusCode: 400,
    message: 'Imagem faltando!'
  });

  const match = cover.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
  if (!match)throw new HttpError({
    statusCode: 400,
    message: 'Formato de imagem inválido!'
  });

  const mimeType = match[0];

  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(mimeType)) {
    throw new HttpError({
      statusCode: 400,
      message: 'Formato de imagem inválido!'
    });
  }
}