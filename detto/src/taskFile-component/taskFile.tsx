// src/components/TaskFile.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../interfaces/task';

interface TaskFileProps {
  task: Task;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void; 
  isSelected: boolean;
}

const TaskFile: React.FC<TaskFileProps> = ({ task, onUpdateTaskTitle, isSelected }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditableTitle(task.title); 
  }, [task.title]);


  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); 
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
  };

  const saveTitle = () => {
    if (editableTitle.trim() === '') {
      setEditableTitle(task.title); 
    } else if (editableTitle !== task.title) {
      onUpdateTaskTitle(task.id, editableTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleBlur = () => {
    saveTitle();
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      setEditableTitle(task.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div
      className="task-file"
      style={{
        border: isSelected ? '2px solid dodgerblue' : '1px solid #ccc', 
        padding: '10px',
        margin: '10px',
        minWidth: '200px',
        backgroundColor: isSelected ? '#e7f3ff' : '#fff', 
        boxShadow: isSelected ? '0 0 8px rgba(30, 144, 255, 0.5)' : '2px 2px 5px rgba(0,0,0,0.1)',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease', 
      }}
    >
      {isEditingTitle ? (
        <input
          ref={inputRef}
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          style={{ fontSize: '1.17em', fontWeight: 'bold', width: '90%', border: '1px solid blue', padding: '2px' }}
        />
      ) : (
        <h3 onClick={handleTitleClick} style={{ cursor: 'pointer', margin: '0 0 10px 0', color: isSelected ? 'dodgerblue' : 'inherit' }}>
          {task.title}
        </h3>
      )}
      <p>{task.content}</p>
    </div>
  );
};

export default TaskFile;