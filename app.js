const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Faker = require('faker');

let items = [];
const size = 5;
for (let i = 0; i < size; i++) {
  let obj = {
    id: Faker.id,
    name: Faker.name.firstName(),
    lastname: Faker.name.lastName()
  }
  items.push(obj);
}

let data = [];
for (let i = 0; i < size; i++) {
  data.push({
    id: Faker.random.uuid(),
    codeName: Faker.name.firstName(),
    description: `decription ${i}`,
    date: Faker.date.future()
  });
}

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json())

  server.get('/dreans', (req, res) => {
    return app.render(req, res, '/dreans', req.query);
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query);
  })

  server.get('/api/items', (req, res) => {
    return res.status(200).json({ users: items });
  });
  server.get('/api/alldreans', (req, res) => {
    return res.json(data);
  })

  server.get('/api/redact/:id', (req, res) => {
    const id = req.params.id;
    return res.json(data.find(obj => obj.id === id))
  })

  server.post('/api/redact',(req,res)=>{
    console.log(req.body);
    const item = req.body;
    item.codeName = '333';

    const index = data.findIndex(obj => obj.id === item.id);
    
    
    if(index){
      console.log('data before : ',data);
      console.log('find obj',index)
      data[index] = item;
      console.log('data after : ',data);
    }else{
      console.log('not find obj',index)
    }
    return res.json('s');
  })

  server.get('/tictactoe', (req, res) => {
    return app.render(req, res, '/tictactoe', req.query);
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
  })
})