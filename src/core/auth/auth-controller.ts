import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import { User } from '../user/user-types';

interface AuthorizeQueryParams {
  code?: string;
}

interface GithubOauth {
  access_token: string;
}

export default class AuthController {
  githubService;

  constructor(githubService: AxiosInstance) {
    this.githubService = githubService;

    this.auth = this.auth.bind(this);
    this.authorize = this.authorize.bind(this);
    this.success = this.success.bind(this);
  }

  auth(_req: Request, res: Response) {
    return res.render('login.hbs', { client_id: process.env.GITHUB_CLIENT });
  }

  async authorize(req: Request, res: Response) {
    const { code }: AuthorizeQueryParams = req.query;
    const { access_token: token }: GithubOauth = await this.githubService.post(
      'login/oauth/access_token', {
      code,
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
    });

    return res.redirect(`/auth/success?token=${token}`);
  }

  async success(req: Request, res: Response) {
    const { token } = req.query;
    global.console.log(token);
    const user: User  = await this.githubService.get('/user', {
      headers: {
        Authorization: 'token ' + token,
      }
    });
    global.console.log(user);
    res.render('success.hbs', { user });
  }
}