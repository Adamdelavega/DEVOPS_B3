import express from 'express';
const app = express();
const port = 8000;
const httpMethod = 'GET';
const route = '/ping';

app.get('/:path', (req, res) => {
    if(req.path === route){
        res.json(req.headers);
    } else {
        res.status(404).end();
    }    
})
app.get('/', (req, res) => {
    res.status(404).end();
})
app.get('/ping/:path', (req, res) => {
    res.status(404).end();
})
app.get('/:path/ping', (req, res) => {
    res.status(404).end();
})
app.post('/:path', (req, res) => {
    res.status(404).end();
})
app.post('/', (req, res) => {
    res.status(404).end();
})
app.post('/ping/:path', (req, res) => {
    res.status(404).end();
})
app.post('/:path/ping', (req, res) => {
    res.status(404).end();
})
app.listen(port, '0.0.0.0',() => {
    console.log('The application is listening on all interfaces on port',port,'!');
})