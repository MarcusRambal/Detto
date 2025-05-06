// src/components/MainContent.tsx
import React from 'react';
import type { Task } from '../interfaces/task';
import TaskFile from '../taskFile-component/taskFile'; 

interface MainContentProps {
  tasks: Task[];
}

const MainContent: React.FC<MainContentProps> = ({ tasks }) => {
  return (
    <div className="main-content" style={{ flexGrow: 1, padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {tasks.length === 0 ? (
        <p>No hay tareas. Crea una nueva desde la barra lateral.</p>
      ) : (
        tasks.map(task => (
          <TaskFile key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default MainContent;