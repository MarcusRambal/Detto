// src/components/Sidebar.tsx
import React from 'react';

interface LeftbarProps {
  onCreateTask: () => void; 
}

const LeftBar: React.FC<LeftbarProps> = ({ onCreateTask }) => {
  return (
    <div className="sidebar" style={{ width: '250px', borderRight: '1px solid #ddd', padding: '20px', height: '100vh' }}>
      <h2>Opciones</h2>
      <button onClick={onCreateTask}>
        Crear Nueva Tarea
      </button>
    </div>
  );
};

export default LeftBar;