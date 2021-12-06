import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/user/user.service';
import { Chat, ChatModel } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject(ChatModel) private readonly chatModel: Model<Chat>,
    private readonly userService: UserService,
  ) {}

  private allUsers = [];
  private connectedUsers = [];

  async getChats(): Promise<Chat[]> {
    return await this.chatModel.find();
  }

  async saveChat(chat: Chat): Promise<void> {
    const createdChat = new this.chatModel(chat);
    await createdChat.save();
  }

  userConnected(username: string, userid: string) {
    const user = { username, userid };
    const filteredUsers = this.allUsers.filter((u) => u.username === username);
    if (filteredUsers.length == 0) {
      this.allUsers.push(user);
    }
    this.connectedUsers.push(username);
    console.log('All Users', username);
    console.log('Connected Users', this.connectedUsers);
  }

  userDisconnected(userName: string) {
    const userIndex = this.connectedUsers.indexOf(userName);
    this.connectedUsers.splice(userIndex, 1);
    console.log('All Users', this.allUsers);
    console.log('Connected Users', this.connectedUsers);
  }

  async sendMessagesToOfflineUsers(chat: Chat) {
    const messagePayload = {
      data: {
        type: 'CHAT',
        title: 'chat',
        message: chat.message,
        userid: chat.userid,
        groupid: chat.groupid,
        time: chat.createdAt,
      },
      tokens: [],
    };
    const userTokens = this.allUsers
      .filter((user) => !this.connectedUsers.includes(user.userName))
      .map((user) => {
        return user.registrationToken;
      });
    if (userTokens.length == 0) {
      return;
    }
    messagePayload.tokens = userTokens;
    try {
      // await defaultApp.messaging().sendMulticast(messagePayload);
    } catch (ex) {
      console.log(JSON.stringify(ex));
    }
  }
}
