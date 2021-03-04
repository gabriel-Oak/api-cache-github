import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import { User } from '../../types';
class UserController {
  private githubService: AxiosInstance;

  constructor(githubService: AxiosInstance) {
    this.githubService = githubService;

    this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const { since = 0, per_page = 10 } = req.query;

    try {
      const users: User[] = await this.githubService.get('/users', {
        params: { since, per_page },
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}

export default UserController;