if (process.env.NODE_ENV !== 'pproduction') {
  // tslint:disable-next-line: no-var-requires
  require('dotenv/config');
}

declare module '*.json' {
  const value: any;
  export default value;
}