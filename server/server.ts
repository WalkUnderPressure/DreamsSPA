import Express, { Request, Response, Application } from 'express';
import Next from 'next';
import * as bodyParser from 'body-parser';
import queryString from 'query-string';
import url from 'url';
import models from '../db/database';
import config from '../config';
import ServerResponse from '../Templates/ServerResponse';
import DreanItem from '../Templates/DreanItem';
import { AwilixContainer } from "awilix";
import { loadControllers, scopePerRequest } from 'awilix-express'
import container from './container';

models(config.mongo.uri, config.mongo.options)
const domain: string = config.baseUrl
const port: number = parseInt(domain.split(':')[2])

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Application = Express()

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
