import Express from 'express';
import Next from 'next';
import * as bodyParser from 'body-parser';
import queryString from 'query-string'
import url from 'url';
import models from '../db/database';
import DreansQueries from '../db/DreansQueries';
import config from '../config';
import ServerResponse from '../Templates/ServerResponse';

models(config.mongo.uri, config.mongo.options)

const domain: string = config.baseUrl
const port: number = parseInt(domain.split(':')[2])

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Express.Application = Express()

  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())

  server.get('/', (req: Express.Request, res: Express.Response) => {
    // @ts-ignore
    return app.render(req, res, '/', req.query)
  })

  server.get('/dreans', (req: Express.Request, res: Express.Response) => {
    // @ts-ignore
    return app.render(req, res, '/dreans', req.query)
  })

  server.get('/api/alldreans', (req: Express.Request, res: Express.Response) => {
    DreansQueries.getDreans()
      .then(resolve => {

        const serRes: ServerResponse = {
          error: (resolve == null ? true : false),
          data: resolve,
          message: (resolve == null ? 'Cant get all items!' : 'Successfully get all items!')
        }

        return res.json(serRes)
      })
  })

  server.get('/api/redact/:id', (req : Express.Request, res : Express.Response) => {
    const id = req.params.id;

    console.log('id for redact : ', id);

    DreansQueries.getDrean(id)
      .then(resolve => {

        const serRes: ServerResponse = {
          error: (resolve == null ? true : false),
          data: resolve,
          message: (resolve == null ? 'Cant get item for redact!' : 'Successfully get item for redact!')
        }

        return res.json(serRes);
      })
  })

  server.post('/api/redact',(req : Express.Request, res : Express.Response)=>{
    let item = req.body;
    
    console.log('item for upload or save : ', item);
    
    DreansQueries.updateDrean(item._id,item)
      .then(resolve => {
        console.log('item for update : ', resolve);

        const serRes: ServerResponse = {
          error: (resolve == null ? true : false),
          data: resolve,
          message: (resolve == null ? 'Cant update item!' : 'Successfully update item!')
        }

        return res.json(serRes);
      })
  })

  server.delete('/api/remove/', (req: Express.Request, res: Express.Response) => {
    const id = req.body._id;
    console.log('id for delete : ', id);
    DreansQueries.deleteDrean(id)
      .then(resolve => {
        console.log('item for delete : ', resolve);

        const serRes: ServerResponse = {
          error: (resolve == null ? true : false),
          data: resolve,
          message: (resolve == null ? 'Cant delete item!' : 'Successfully delete item!')
        }

        return res.json(serRes);
      })
  })

  server.all('*', (req: Express.Request, res: Express.Response) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${domain}`)
  })
})
