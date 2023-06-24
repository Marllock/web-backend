import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway(81, { transports: ['websocket', 'polling'], cors: true })
  export class AnimeGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
  {
    @WebSocketServer()
    server: Server;
  
    handleConnection() {
      Logger.log('User connected');
    }
  
    handleDisconnect() {
      Logger.log('User disconnected');
    }
  
    afterInit() {
      Logger.log('Socket is live');
    }
  
    sendNotification() {
      this.server.emit('notification', { message: 'Anime created successfully' });
      Logger.log('emited');
    }
  }