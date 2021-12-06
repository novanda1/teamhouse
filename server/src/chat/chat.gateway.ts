import { Bind } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { ChatQuery } from './dto/chat-query.dto';
import { Chat } from './entities/chat.entity';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://amritb.github.io'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class ChatGateway implements NestGateway {
  constructor(private chatService: ChatService) {}

  afterInit(server: any) {
    console.log('Init', server);
  }

  handleConnection(socket: any) {
    const query = socket.handshake.query as ChatQuery;
    console.log('Connect', query);
    this.chatService.userConnected(query.username, query.userid);
    process.nextTick(async () => {
      socket.emit('allChats', await this.chatService.getChatsIncludeUser(query.groupid));
    });
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
    this.chatService.userDisconnected(query.username);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: Chat, sender: any) {
    await this.chatService.saveChat(chat);
    sender.emit('newChat', chat);
    sender.broadcast.emit('newChat', chat);
    await this.chatService.sendMessagesToOfflineUsers(chat);
  }
}
