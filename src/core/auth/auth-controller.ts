import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import { HttpError } from '../../utils/errors';
import { User } from '../user/user-types';

interface AuthorizeQueryParams {
  code?: string;
  returnToken?: boolean;
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
    const { code, returnToken }: AuthorizeQueryParams = req.query;
    global.console.log(code);

    const { access_token }: GithubOauth = await this.githubService.post(
      'https://github.com/login/oauth/access_token', {
      code,
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
    });

    if (!access_token && returnToken) throw new HttpError({
      message: 'Codigo inválido ou expirado, tende novamente!',
      statusCode: 400,
    });
    
    return returnToken
      ? res.json({ token: access_token })
      : res.redirect(`/auth/success?token=${access_token}`);
  }

  async success(req: Request, res: Response) {
    const { token } = req.query;
    const user: User = await this.githubService.get('/user', {
      headers: {
        Authorization: 'token ' + token,
      }
    });

    res.render('success.hbs', { user, token });
  }
}