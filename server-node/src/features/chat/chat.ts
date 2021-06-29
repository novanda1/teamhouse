import { Socket } from 'socket.io';
import { Message } from '../../schema/chatTeam.schema';
import { ChatTeamService } from '../../services/chat/chatTeam.service';

const socketio = require('socket.io');
const service = new ChatTeamService();

export const chatFeature = (server: any) => {
  const io: Socket = socketio(server, {
    cors: {
      origin: '*',
    },
    path: '/team/',
  });

  io.on('connection', (socket: Socket) => {
    const teamId = socket.handshake.query.teamId as string;

    socket.on('team', async (team) => {
      socket.join(team);
      console.log('join to:', team);

      const messages = await service.find(teamId);
      socket.emit('change-team', messages?.messages);
    });

    socket.on('input', async (message: Message) => {
      await service.addMessage(teamId, message);
      io.to(teamId).emit('output', message);
    });
  });

  return io;
};
