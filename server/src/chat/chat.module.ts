import { Module } from '@nestjs/common';
import { JwtAuthModule } from 'src/auth/jwt/jwt.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { ChatGateway } from './chat.gateway';
import { chatsProviders } from './chat.provider';
import { ChatService } from './chat.service';

@Module({
  imports: [JwtAuthModule, DatabaseModule, UserModule],
  providers: [ChatService, ChatGateway, ...chatsProviders],
})
export class ChatModule {}
