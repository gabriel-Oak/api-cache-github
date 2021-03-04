import { Response, Request } from "express";

export const indexRoute = async (_req: Request, res: Response) => res.json({
  message: 'Hellow World',
  date: new Date().toISOString(),
});
