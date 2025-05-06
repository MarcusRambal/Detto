export interface Task {
    id: string;
    title: string;
    content: string;
    canvasData?: string; // Opcional, para almacenar datos del canvas
  }