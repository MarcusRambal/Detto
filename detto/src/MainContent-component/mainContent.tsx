import React from 'react';
import type { Task } from '../interfaces/task';
import TaskFile from '../taskFile-component/taskFile'; 

interface MainContentProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ tasks, selectedTaskId, onUpdateTaskTitle }) => {
    

    const selectedTask = selectedTaskId
    ? tasks.find(task => task.id === selectedTaskId)
    : null;

    return (
        <div className="main-content" style={{ flexGrow: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {selectedTask ? (
            <TaskFile
              key={selectedTask.id}
              task={selectedTask}
              onUpdateTaskTitle={onUpdateTaskTitle}
              isSelected={true}
            />
          ) : (
            <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '50px' }}>
              {tasks.length > 0 ? 'Selecciona una tarea de la barra lateral para verla aquí.' : 'No hay tareas. Crea una nueva desde la barra lateral.'}
            </p>
          )}
        </div>
      );
    };
    

export default MainContent;