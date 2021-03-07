import { Router } from "express";

interface Path {
  key: string;
  value: object;
}
export interface Route {
  prefix: string;
  routes: Router;
  tag: string;
  paths: Path[];
}