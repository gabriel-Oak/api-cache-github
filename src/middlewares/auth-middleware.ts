import { NextFunction, Request, Response } from 'express';
import { User } from '../core/user/user-types';
import orm from '../database';
import CoverPhoto from '../database/entities/cover-photo';
import githubService from '../services/github-service';
import redisService from '../services/redis-service';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({
    message: 'Token não encontrado, efetue login!'
  });

  const cached: User = await redisService.get(`user:token:${authorization}`);

  if (cached) {
    req.headers.userLogin = cached.login;
    req.headers.userId = String(cached.id);
  } else {
    try {
      const user: User = await githubService.get('/user', {
        headers: {
          Authorization: 'token ' + authorization,
        }
      });
      if (user) {
        const coverRepository = orm.connection.getRepository(CoverPhoto);
        user.cover = await coverRepository.findOne({
          where: { userId: user.id },
          select: ['externalId', 'url', 'thumbUrl'],
        });
      }
      req.headers.userLogin = user.login;
      req.headers.userId = String(user.id);
      redisService.set(`user:token:${authorization}`, user, 60 * 60 * 12);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  return next();
}

export default authMiddleware;
