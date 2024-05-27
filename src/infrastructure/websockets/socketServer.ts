// src/infrastructure/websockets/SocketServer.ts

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { io as Client } from 'socket.io-client';
import { envs } from '../../config/envs';
import SocketController from './socketController';
import SocketService from '../../application/services/socketService';

const { SOCKET_PORT } = envs;

class SocketServer {
    private io: SocketIOServer;
    private iotClient: SocketIOServer;

    constructor(server: HttpServer) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.io.on('connection', (socket) => {
            SocketController.handleConnection(socket);
        });

        // Conectar al servidor IoT
        this.iotClient = Client('http://localhost:3001');

        this.iotClient.on('connect', () => {
            console.log('Connected to IoT Server');
        });

        this.iotClient.on('match_data', (data) => {
            console.log('Received match data from IoT Server:', data);
            SocketService.handleMessage(data, this.io);
        });

        this.iotClient.on('disconnect', () => {
            console.log('Disconnected from IoT Server');
        });
    }

    start() {
        this.io.listen(Number(SOCKET_PORT));
        console.log(`Socket.io server is running on port ${SOCKET_PORT}`);
    }
}

export default SocketServer;
