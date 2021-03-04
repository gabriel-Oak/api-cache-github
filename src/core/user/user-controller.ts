import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import { User } from '../../types';
import querystring, { ParsedUrlQueryInput } from 'querystring';
import { RedisService } from '../../services/redis-service';
class UserController {
  private githubService;
  private redisService;

  constructor(githubService: AxiosInstance, redisService: RedisService) {
    this.githubService = githubService;
    this.redisService = redisService;

    this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const params = {
      since: req.query.since || 0,
      per_page: req.query.per_page || 10
    } as unknown as ParsedUrlQueryInput;

    const queryParams = querystring.stringify(params);

    try {
      const cached = await this.redisService.get(queryParams);
      if (cached) return res.json(cached);

      const users: User[] = await this.githubService.get('/users', { params });
      this.redisService.set(queryParams, users);

      return res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default UserController;