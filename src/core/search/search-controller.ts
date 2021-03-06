import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import { SearchUserResults } from './search-types';

export default class SearchController {
  private githubService;

  constructor(githubService: AxiosInstance) {
    this.githubService = githubService;

    this.searchUsers = this.searchUsers.bind(this);
  }

  async searchUsers(req: Request, res: Response){
    const params = {
      q: req.query.q || '',
      order: req.query.order || 'desc',
      per_page: req.query.per_page || 10,
      page: req.query.page || 1,
    };

    try {
      const results: SearchUserResults = await this.githubService.get(
        '/search/users',
        { params },
      );
      return res.json(results);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
