const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const port = 8080;

const server = http.createServer((req, res) =>{
    proxy.web(req, res, {
        target: 'http://localhost:3000/login'
    });
});

server.listen(port, ()=>{
    console.log('proxy server listening at http://localhost:8080');
});