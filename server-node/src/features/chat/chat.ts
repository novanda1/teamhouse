import { Socket } from 'socket.io';

const socketio = require('socket.io');

export const chatFeature = (server: any) => {
  const io: Socket = socketio(server, {
    cors: {
      origin: '*',
    },
    path: '/team/',
  });

  io.on('connection', (socket: Socket) => {
    socket.on('room', (room) => {
      console.log(`room`, room);
      socket.join(room);
    });

    socket.on('input', (text: Socket) => {
      console.log(`socket`, socket.handshake.query.teamId);
      io.to('60d05016c4a5c83e83a981c6').emit('output', {
        team: socket.handshake.query.teamId,
        text,
        user: socket.handshake.auth.user,
      });
    });
  });

  // setInterval(() => {
  //   io.to('60d05016c4a5c83e83a981c6').emit(
  //     'message',
  //     'what is going on, party people?',
  //   );
  // }, 3000);

  // setInterval(() => {
  //   io.to('room2').emit('message', 'anyone in this room yet?');
  // }, 3000);

  return io;
};
