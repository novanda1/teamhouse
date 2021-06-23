import { Socket } from 'socket.io';

const socketio = require('socket.io');

export const chatFeature = (server: any) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
    path: '/team/',
  });

  io.on('connection', function (socket: Socket) {
    console.log('a user connected', socket.handshake.auth);
    socket.on('input', (data: any) => {
      console.log('sending');
      socket.emit('output', data);
    });
  });

  return io;
};
