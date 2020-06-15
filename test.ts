import Express from 'express';
import jwt from 'jsonwebtoken';

const server = Express();

server.get('/api', (req, res) => {
    res.json({
        message : 'welcome'
    });
});

server.post('/api/add', verifyToken, (req, res) => {
    res.json({
        message : 'Added!'
    })
})

const verifyToken = (req, res, next) => {
    const header = req.headers['autorization'];
    if(typeof header !== undefined){

    }else{
        
    }
}
server.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: 'David',
        email: 'some@gmail.com'
    };
    console.log(user);
    jwt.sign({user},'spa', (err, token) => {
        res.json({
            token: token
        });
    })
})

server.listen(5000, () => {
    console.log('server start listen on port 5000');
})