import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';

export default class FeedController {
  private githubService;

  constructor(
    githubService: AxiosInstance,
  ) {
    this.githubService = githubService;

    this.getFeed = this.getFeed.bind(this);
  }

  async getFeed(req: Request, res: Response) {

  }
}