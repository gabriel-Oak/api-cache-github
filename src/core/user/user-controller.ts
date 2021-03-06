import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import querystring, { ParsedUrlQueryInput } from 'querystring';
import { ImgbbService } from '../../services/imgbb-service';
import { RedisService } from '../../services/redis-service';
import { User } from './user-types';
import CoverPhoto from '../../database/entities/cover-photo';
import { ImgbbModel } from '../../utils/types';
import { Orm } from '../../database';
import { insertCoverScope } from './user-scopes';

type Params = {
  username: string;
}

export default class UserController {
  private githubService;
  private redisService;
  private imgbbService;
  private orm;

  constructor(
    githubService: AxiosInstance,
    redisService: RedisService,
    imgbbService: ImgbbService,
    orm: Orm,
  ) {
    this.githubService = githubService;
    this.redisService = redisService;
    this.imgbbService = imgbbService;
    this.orm = orm;

    this.list = this.list.bind(this);
    this.repos = this.repos.bind(this);
    this.findByName = this.findByName.bind(this);
    this.insertCover = this.insertCover.bind(this);
    this.getUserCover = this.getUserCover.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  async findByName({ params: { username } }: Request<Params>, res: Response) {
    const cached: User = await this.redisService.get(`user:${username}`);
    if (cached) return res.json(cached);

    let user: User = await this.githubService.get(`/users/${username}`);
    user = await this.getUserCover(user);

    this.redisService.set(`user:${username}`, user, 60 * 30);
    return res.json(user);
  }

  async list(req: Request, res: Response) {
    const params = {
      since: req.query.since || 0,
      per_page: req.query.per_page || 10
    } as unknown as ParsedUrlQueryInput;

    const queryParams = querystring.stringify(params);

    const cached: User[] = await this.redisService.get(`user:${queryParams}`);
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

  async insertCover(req: Request, res: Response) {
    const { headers, body } = req;
    const coverRepository = this.orm.connection.getRepository(CoverPhoto);

    insertCoverScope(body);

    const { data }: { data: ImgbbModel } = await this.imgbbService.uploadFile({
      image: body.cover.split('base64,')[1],
      name: `${headers.userId}-cover`,
    });

    const cover = await coverRepository.save(new CoverPhoto({
      deleteUrl: data.delete_url,
      externalId: data.id,
      thumbUrl: data.thumb.url,
      url: data.url,
      userId: Number(headers.userId)
    }));

    return res.json({ cover });
  }

  async getMe(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({
      message: 'Token não encontrado, efetue login!'
    });

    const cached: User = await this.redisService.get(`user:token:${authorization}`);
    if (cached) return res.json({ user: cached });

    try {
      let user: User = await this.githubService.get('/user', {
        headers: {
          Authorization: 'token ' + authorization,
        }
      });
      user = await this.getUserCover(user);

      this.redisService.set(`user:token:${authorization}`, user, 60 * 60 * 12);
      return res.json();
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  private async getUserCover(user: User) {
    if (user) {
      const coverRepository = this.orm.connection.getRepository(CoverPhoto);
      user.cover = await coverRepository.findOne({
        where: { userId: user.id },
        select: ['externalId', 'url', 'thumbUrl'],
      });
    }
    return user;
  }
}
