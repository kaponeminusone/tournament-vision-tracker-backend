import { Socket } from 'socket.io';

class SocketController {
    static handleConnection(socket: Socket) {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    }
}

export default SocketController;
