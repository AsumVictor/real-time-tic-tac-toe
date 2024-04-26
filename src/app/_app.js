import App from 'next/app';
import getSocket from './socketInstance';

class MyApp extends App {
  componentDidMount() {
    // Connect the socket when the app starts
    console.log('object')
    const socket = getSocket();
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
  }

  // Rest of your _app.js code
}

export default MyApp;
