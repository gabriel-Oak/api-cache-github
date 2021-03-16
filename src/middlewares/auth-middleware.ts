import { NextFunction, Request, Response } from 'express';
import { User } from '../core/user/user-types';
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
    const user: User = await githubService.get('/user', {
      headers: {
        Authorization: 'token ' + authorization,
      }
    });
    req.headers.userLogin = user.login;
    req.headers.userId = String(user.id);
    redisService.set(`user:token:${authorization}`, user, 600);
  }

  return next();
}

export default authMiddleware;
