import Express from 'express'
import Next from 'next'
import * as bodyParser from 'body-parser'
import queryString from 'query-string'
import url from 'url'
import models from '../db/database'
import { DreansRepository } from '../db/dreansRepository'
import config from '../config'

models(config.mongo.uri, config.mongo.options)
const dreansRepo:DreansRepository = new DreansRepository()

const domain : string = config.baseUrl
const port : number = parseInt(domain.split(':')[2])

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

// import * as Faker from 'faker';
// import Item from '../Templates/Item';

// let data : Array<Item> = [];
// const size : number = 3;
// for (let i:number = 0; i < size; i++) {
//   const object : Item = {
//     id : Faker.random.uuid(),
//     codeName : Faker.name.firstName(),
//     description : `decription ${i}`,
//     dateOfEvent : Faker.date.future(),
//     guests : ['a','b','c'],
//     needThings : ['1','2','3']
//   };

//   data.push(object);
// }

app.prepare().then(() => {
  const server:Express.Application = Express()

  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())

  server.get('/', (req : Express.Request, res : Express.Response) => {
    // @ts-ignore
    return app.render(req, res, '/', req.query)
  })

  server.get('/dreans', (req : Express.Request, res : Express.Response) => {
    // @ts-ignore
    return app.render(req, res, '/dreans', req.query)
  })

  server.get('/api/alldreans', (req : Express.Request, res : Express.Response) => {
    dreansRepo.getDreans()
      .then(resolve => {
        console.log('resolve : ', resolve)
        return res.json(resolve)
      })
  })

  // server.get('/api/redact/:id', (req : Express.Request, res : Express.Response) => {
  //   const id = req.params.id;
  //   return res.json(data.find(obj => obj.id === id))
  // })

  // server.post('/api/redact',(req : Express.Request, res : Express.Response)=>{
  //   console.log(req.body);
  //   let item = req.body;
  //   let message = '';

  //   const index = data.findIndex(obj => obj.id === item.id);

  //   if(index != -1){
  //     data[index] = item;
  //     item = data.find(obj => obj.id == item.id);
  //     message = "Item was successfully changed!";
  //     console.log('Change object :',item);
  //   }else{
  //     const obj = {... item};
  //     obj.id = Faker.random.uuid();
  //     data.push(obj);
  //     item = data.find(o => o.id == obj.id)
  //     message = "New item was successfully added!";
  //     console.log('New object :',item);
  //   }
  //   return res.json({
  //     error : false,
  //     data : item,
  //     message : message
  //   });
  // })

  server.delete('/api/remove/', (req : Express.Request, res : Express.Response) => {
    const id = req.body.id
    dreansRepo.deleteDrean(id)
      .then(resolve => {
        dreansRepo.getDreans()
          .then(items => {
            return res.json({data : items})
          })
      })
  })

  server.all('*', (req : Express.Request, res : Express.Response) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${domain}`)
  })
})
