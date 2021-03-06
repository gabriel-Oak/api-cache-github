import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import querystring, { ParsedUrlQueryInput } from 'querystring';
import { RedisService } from '../../services/redis-service';
import { User } from './user-types';

type Params = {
  username: string;
}

class UserController {
  private githubService;
  private redisService;

  constructor(githubService: AxiosInstance, redisService: RedisService) {
    this.githubService = githubService;
    this.redisService = redisService;

    this.list = this.list.bind(this);
    this.repos = this.repos.bind(this);
    this.findByName = this.findByName.bind(this);
  }

  async findByName({ params: { username } }: Request<Params>, res: Response) {
    const cached = await this.redisService.get(`user:${username}`);
    if (cached) return res.json(cached);

    const user: User = await this.githubService.get(`/users/${username}`);
    this.redisService.set(`user:${username}`, user, 30);

    return res.json(user);
  }

  async list(req: Request, res: Response) {
    const params = {
      since: req.query.since || 0,
      per_page: req.query.per_page || 10
    } as unknown as ParsedUrlQueryInput;

    const queryParams = querystring.stringify(params);

    const cached = await this.redisService.get(`user:${queryParams}`);
    if (cached) return res.json(cached);

    const users: User[] = await this.githubService.get('/users', { params });
    this.redisService.set(`user:${queryParams}`, users, 60 * 10);

    return res.json(users);
  }

  async repos(
    { params: { username }, query }: Request<Params>,
    res: Response,
  ) {
    const params = {
      type: query.type || 'owner',
      sort: query.sort || 'pushed',
      direction: query.direction || 'desc',
      per_page: query.per_page || 10,
      page: query.page || 1,
    } as unknown as ParsedUrlQueryInput;
    const queryParams = querystring.stringify(params);

    const cached = await this.redisService.get(`user:${username}:repos:${queryParams}`);
    if (cached) return res.json(cached);

    const repos = await this.githubService.get(`/users/${username}/repos`, {
      params,
    });
    this.redisService.set(`user:${username}:repos:${queryParams}`, repos, 30);

    return res.json(repos);
  }
}

export default UserController;