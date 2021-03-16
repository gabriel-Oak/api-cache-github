import { NextFunction, Request, Response } from 'express';
import { User } from '../core/user/user-types';
import githubService from '../services/github-service';
import redisService from '../services/redis-service';
import { HttpError } from '../utils/errors';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new HttpError({
    message: 'Token não encontrado, efetue login!',
    statusCode: 401,
  });

  const cached: User = await redisService.get(`user:token:${authorization}`);

  if (cached) {
    req.headers.userLogin = cached.login;
    req.headers.userId = String(cached.id);
  } else {
    const user: User = await githubService.get('');
    req.headers.userLogin = user.login;
    req.headers.userId = String(user.id);
    redisService.set(`user:token:${authorization}`, user, 600);
  }

  next();
}

export default authMiddleware;
