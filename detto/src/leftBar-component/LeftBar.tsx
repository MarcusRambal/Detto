import React from 'react';
import type { Task } from '../interfaces/task'; 

interface LeftbarProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onCreateTask: () => void;
  onSelectTask: (taskId: string) => void;
}

const LeftBar: React.FC<LeftbarProps> = ({ tasks, selectedTaskId, onCreateTask, onSelectTask }) => {
  return (
    <div
      className="sidebar"
      style={{
        width: '250px',
        borderRight: '1px solid #ddd',
        padding: '20px',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Mis Tareas</h2>
      <button onClick={onCreateTask} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
        Crear Nueva Tarea
      </button>
      <div className="task-list" style={{ overflowY: 'auto', flexGrow: 1 }}>
        {tasks.length === 0 ? (
          <p style={{ color: '#6c757d' }}>No hay tareas aún.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.map(task => (
              <li
                key={task.id}
                onClick={() => onSelectTask(task.id)}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #e9ecef',
                  backgroundColor: task.id === selectedTaskId ? '#cfe2ff' : 'transparent', // Resaltar seleccionado
                  fontWeight: task.id === selectedTaskId ? 'bold' : 'normal',
                  borderRadius: '4px',
                  marginBottom: '5px',
                }}
                title={task.title} // Tooltip con el título completo
              >
                {/* Truncar título si es muy largo para la vista previa */}
                {task.title.length > 20 ? `${task.title.substring(0, 20)}...` : task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default LeftBar;