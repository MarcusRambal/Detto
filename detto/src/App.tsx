// src/App.tsx (o donde esté tu componente principal)
import React, { useState } from 'react';
import LeftBar from './leftBar-component/LeftBar';
import type { Task } from './leftBar-component/LeftBar';
import TaskEditor from './taskEditor-component/taskEditor';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
      { id: 1, name: 'Diseñar interfaz inicial' },
      { id: 2, name: 'Implementar LeftBar' },
      { id: 3, name: 'Crear TaskEditor' },
  ]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleSelectTask = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  const handleAddTask = (newTaskName: string) => {
     const newTask: Task = {
       id: Date.now(),
       name: newTaskName.trim(),
     };
     setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskIdToDelete: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskIdToDelete));
    if (selectedTaskId === taskIdToDelete) {
      setSelectedTaskId(null);
    }
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId) || null;

  // --- RENDER ---
  return (
    <div className="app-layout">
      <LeftBar
        tasks={tasks} 
        selectedTaskId={selectedTaskId} 
        onTaskSelect={handleSelectTask}
        onTaskAdd={handleAddTask}       
        onTaskDelete={handleDeleteTask} 
      />
      <main className="main-content"> 
        <TaskEditor task={selectedTask} /> 
      </main>
    </div>
  );
}

export default App;