import { createServer } from 'http';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';
import express from 'express';

const expressConfig = express().use((req, res) => {
    res.sendFile("/index.html", { root: "./" });
});

const server = createServer(expressConfig);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    ws.on('open', function open() {
        ws.send('something');
    });
    
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});

server.listen(8080, () => {
    console.log('listening....')
});