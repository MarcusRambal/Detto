import React, { useState, useRef, useEffect } from 'react';
import './LeftBar.css'; 
import TaskMenu from '../TaskMenu-component/TaskMenu';


export interface Task {
  id: number;
  name: string;
}


export default function LeftBar() {
  // --- ESTADO ---
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isAddingTask, setIsAddingTask] = useState(false); 
  const [newTaskName, setNewTaskName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); 

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuTaskId, setContextMenuTaskId] = useState<number | null>(null);

  // --- Effects ---
  // Enfocar el input cuando aparezca
  useEffect(() => {
    if (isAddingTask) {
      inputRef.current?.focus();
    }
  }, [isAddingTask]);

  // --- Handlers ---

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
    setNewTaskName(''); 
  };


  const handleNewTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTaskName.trim()) {
        const newTask: Task = {
          id: Date.now(), 
          name: newTaskName.trim(),
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setIsAddingTask(false);
        setNewTaskName('');
      } else {
        setIsAddingTask(false);
        setNewTaskName('');
      }
    } else if (event.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskName('');
    }
  };

  const handleNewTaskBlur = () => {
     if(isAddingTask) {
        setIsAddingTask(false);
        setNewTaskName('');
     }
  };


    const handleTaskMenu = (event: React.MouseEvent<HTMLDivElement>, taskId: number) => {
    event.preventDefault();
  
    setContextMenuVisible(true);           
    setContextMenuPosition({ x: event.clientX, y: event.clientY }); 
    setContextMenuTaskId(taskId);          
  };


    const handleDeleteTask = (taskIdToDelete: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskIdToDelete));
        setContextMenuVisible(false); // Oculta el menú después de borrar
        setContextMenuTaskId(null);
    };

  // --- RENDER ---
  return (
    <aside className="leftBar">
      <div className="leftBarHeader">
        <div className="add-task-section">
          <button
             onClick={handleAddTaskClick}
             title="Nueva Tarea"
             disabled={isAddingTask}
             className="add-task-button"
          >
            Nueva Tarea
          </button>
          {isAddingTask && (
            <input
              ref={inputRef}
              type="text"
              value={newTaskName}
              onChange={handleNewTaskNameChange}
              onKeyDown={handleNewTaskKeyDown}
              onBlur={handleNewTaskBlur}
              placeholder="Nombre de la tarea..."
              className="new-task-input"
            />
          )}
        </div>

        <div className="searchBar"></div>
      </div>

      <div className="taskList">
        {tasks.map(task => (
          <div key={task.id} className="task-item" onContextMenu={(event) => handleTaskMenu(event, task.id)}>
            {task.name}
          </div>
        ))}
         {tasks.length === 0 && !isAddingTask && (
            <p className="no-tasks-message">No hay tareas aún.</p>
         )}
      </div>

      {contextMenuVisible && contextMenuTaskId !== null && (
      <TaskMenu
        position={contextMenuPosition}
        onDelete={() => handleDeleteTask(contextMenuTaskId)}
        onDismiss={() => { 
            setContextMenuVisible(false);
            setContextMenuTaskId(null);
        }}
      />
    )}

    </aside>
  );
}