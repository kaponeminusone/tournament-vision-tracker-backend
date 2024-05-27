
import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketService {
    static handleMessage(data: any, io: SocketIOServer) {
        console.log(`Received match data from IoT:`, data);
        io.emit('match_data', data);
    }
}

export default SocketService;
