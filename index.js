const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", ws => {
    console.log("cliente conectado");

    ws.on("message", data => {
        console.log("mensaje recibido: %s", data);
        const position = JSON.parse(data);

        // broadcast position
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(position));
            }
        });
    });
})
