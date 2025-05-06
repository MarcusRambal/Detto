// src/components/TaskFile.tsx
import React from 'react';
import type { Task } from '../interfaces/task';

interface TaskFileProps {
  task: Task;
}

const TaskFile: React.FC<TaskFileProps> = ({ task }) => {
  return (
    <div className="task-file" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', minWidth: '200px' }}>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
    </div>
  );
};

export default TaskFile;