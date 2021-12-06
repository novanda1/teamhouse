import { Connection } from 'mongoose';
import { Chat, ChatModel, ChatSchema } from './entities/chat.entity';

export const chatsProviders = [
  {
    provide: ChatModel,
    useFactory: (connection: Connection) =>
      connection.model(Chat.name, ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
