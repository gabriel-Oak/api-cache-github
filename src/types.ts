import { Request, Response } from "express";

export type Debugger = (...args: any[]) => void;
export type ControllerAction = (req: Request<any>, res: Response) => any;

export interface Controller {
  list?: ControllerAction;
  store?: ControllerAction;
  update?: ControllerAction;
  delete?: ControllerAction;
  find?: ControllerAction;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}