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

export interface ImgbbModel {
  id: string,
  title: string,
  url_viewer: string,
  url: string,
  display_url: string,
  size: number,
  time: string,
  expiration: string,
  image: {
    filename: string,
    name: string,
    mime: string,
    extension: string,
    url: string
  },
  thumb: {
    filename: string,
    name: string,
    mime: string,
    extension: string,
    url: string
  },
  delete_url: string
}
