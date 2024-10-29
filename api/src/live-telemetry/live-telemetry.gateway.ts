import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class LiveTelemetryGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private clients: Set<Socket> = new Set();

  handleConnection(client: Socket) {
    console.log('Client connected');
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    this.clients.delete(client);
  }

  sendLiveUpdate(data: any) {
    this.clients.forEach((client) => {
      client.emit('liveUpdate', data);
    });
  }
}
