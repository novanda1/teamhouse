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
      io.to(socket.handshake.query.teamId as string).emit('output', text);
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
