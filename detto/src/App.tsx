// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './leftBar-component/LeftBar';
import MainContent from './MainContent-component/mainContent';
import type  { Task } from './interfaces/task';
import './App.css'; 

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = () => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Genera un ID único (navegadores modernos)
      // O usa: id: Date.now().toString(), // Alternativa más simple para IDs únicos
      title: `Tarea ${tasks.length + 1}`,
      content: `Este es el contenido de la Tarea ${tasks.length + 1}. ¡Hola Mundo desde la tarea!`,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Sidebar onCreateTask={handleCreateTask} />
      <MainContent tasks={tasks} />
    </div>
  );
};

export default App;