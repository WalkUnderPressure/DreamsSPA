import Express, { Request, Response, Application } from 'express';
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


models( config.mongo.uri, config.mongo.options)
const domain: string = config.baseUrl
const port: number = parseInt(domain.split(':')[2])

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Application = Express()
  const passport = container.resolve<PassportStatic>('passport');
  server.use(passport.initialize());
  
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())

  server.use(scopePerRequest(container));
  const files = 'controllers/**/*.' + (config.dev ? 'ts' : 'js');
  server.use(loadControllers(files, { cwd: __dirname }))

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
