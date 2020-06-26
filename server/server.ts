import Express, { Request, Response, Application, NextFunction } from 'express';
import Next from 'next';
import * as bodyParser from 'body-parser';
import * as  queryString from 'query-string';
import * as url from 'url';
import ServerResponse from '../Templates/ServerResponse';
import { AwilixContainer } from "awilix";
import { loadControllers, scopePerRequest } from 'awilix-express'
import models from '../db/database';
import config from '../config';
import container from './container';
import { PassportStatic } from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { USER_ROLE, IIdentity } from './../COMMON';


export const IGNORS = [
  '/favicon.ico',
  '/_next',
  '_next/webpack-hmr',
  '__nextjs_original-stack-frame',
  '/static',
  '/sitemap.xml',
  '/robots.txt',
  '/service-worker.js',
  '/manifest.json',
  '/styles.chunk.css.map',
  '/error',
  '/login',
  '/registration',
];

models(config.mongo.uri, config.mongo.options)
const domain: string = config.baseUrl
const port: number = parseInt(domain.split(':')[2])

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()
const passport = container.resolve<PassportStatic>('passport');

app.prepare().then(() => {
  const server: Application = Express()
  server.use(passport.initialize());

  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  server.use(cookieParser())

  server.use(cookieSession({
    name: 'session',
    keys: [config.jwtSecret],
    maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days
  }));

  server.use(scopePerRequest(container));
  const files = 'controllers/**/*.' + (config.dev ? 'ts' : 'js');
  server.use(loadControllers(files, { cwd: __dirname }))

  server.use(acl);

  server.get('/', (req: Request, res: Response) => {
    // @ts-ignore
    return app.render(req, res, '/', req.query)
  })

  server.get('/dreans', (req: Request, res: Response) => {
    // @ts-ignore
    return app.render(req, res, '/dreans', req.query)
  })

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${domain}`)
  })
})

function acl(req: Request, res: Response, next: NextFunction) {
  let useAcl = true;
  const path = req.path.toString();
  for (const item of IGNORS) {
    if (path.startsWith(item) || path ===  '/') {
      useAcl = false;
    }
  }
  if (useAcl) {
    passport.authenticate('local-jwt', (err, identity: IIdentity) => {
      const isLogged = identity && identity.userId && identity.role !== USER_ROLE.GUEST ? true : false;
      const resource = req.path.replace(/\./g, '_');
      
      console.log('req.method=', req.method, 'resource=', resource, 'isLogged?', isLogged);
      
      if (!isLogged) {
        const isAPICall = resource.toLowerCase().includes('api');
        if (isAPICall) {
          return res.status(401).json({
            error: false,
            data: null,
            message: 'You are not authorized to send this request!',
          });
        } else {
          return res.redirect('/error');
        }
      }
      
      next();
    })(req, res, next);
  } else {
    next();
  }
}