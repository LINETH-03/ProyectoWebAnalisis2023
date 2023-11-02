import { useEffect} from 'react'
import io from 'socket.io-client';

export const Videollamada = () => {
  useEffect(() => {
    const socket = io('http://localhost:8080'); // Reemplaza con la URL de tu servidor backend

    const canvas = document.querySelector('#preview');
    const context = canvas.getContext('2d');
    canvas.style.display = 'none';
    canvas.width = 512;
    canvas.height = 384;
    context.width = canvas.width;
    context.height = canvas.height;

    const videoCall = document.querySelector('#video');

    function verVideo(video, context) {
      context.drawImage(video, 0, 0, context.width, context.height);
      socket.emit('stream', canvas.toDataURL('image/webp'));
    }

    const startStreaming = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoCall.srcObject = stream;
        console.log('Camara encendida');
        
        setInterval(() => {
          verVideo(videoCall, context);
        }, 50);
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    };

    startStreaming();

    return () => {
      socket.disconnect(); // Cierra la conexión del socket cuando el componente se desmonta
    };
  }, []);

  return (
    <div>
      <h1>Hola</h1>
      <button id="btn">Emitir</button>
      <video src="" id="video" style={{ width: '800px', height: '600px' }} autoPlay></video>
      <canvas id="preview"></canvas>
      <div className="status"></div>
    </div>
  );
};

export default Videollamada;
