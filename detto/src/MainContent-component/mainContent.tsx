import React from 'react';
import type { Task } from '../interfaces/task';
import TaskFile from '../taskFile-component/taskFile'; 

interface MainContentProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ tasks, selectedTaskId, onUpdateTaskTitle }) => {
    const tasksToDisplay = tasks; 
    return (
        <div className="main-content" style={{ flexGrow: 1, padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {tasksToDisplay.length === 0 ? (
            <p>No hay tareas para mostrar. Crea una nueva desde la barra lateral.</p>
          ) : (
            tasksToDisplay.map(task => (
              <TaskFile
                key={task.id}
                task={task}
                onUpdateTaskTitle={onUpdateTaskTitle}
                isSelected={task.id === selectedTaskId} // Pasar si esta tarea es la seleccionada
              />
            ))
          )}
        </div>
      );
    };

export default MainContent;