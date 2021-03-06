import { Request, Response, Router } from "express";

export type Debugger = (...args: any[]) => void;
export type ControllerAction = (req: Request<any>, res: Response) => any;

export interface Controller {
  list?: ControllerAction;
  store?: ControllerAction;
  update?: ControllerAction;
  delete?: ControllerAction;
  find?: ControllerAction;
}

export type Route = {
  prefix: string;
  routes: Router;
}