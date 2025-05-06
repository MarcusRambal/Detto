import React, { useState } from 'react';
import Sidebar from './leftBar-component/LeftBar';
import MainContent from './MainContent-component/mainContent';
import type  { Task } from './interfaces/task';
import './App.css'; 

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleCreateTask = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: `Tarea ${tasks.length + 1}`,
      content: `Este es el contenido de la Tarea ${tasks.length + 1}. ¡Hola Mundo desde la tarea!`,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setSelectedTaskId(newTask.id);
  };

  const handleUpdateTaskTitle = (taskId: string, newTitle: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Sidebar
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onCreateTask={handleCreateTask}
        onSelectTask={handleSelectTask} // Pasar la nueva función
      />
      <MainContent
        tasks={tasks}
        selectedTaskId={selectedTaskId} // Pasar el ID seleccionado
        onUpdateTaskTitle={handleUpdateTaskTitle}
      />
    </div>
  );
};
export default App;