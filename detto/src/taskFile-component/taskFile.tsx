// src/components/TaskFile.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../interfaces/task';
import WhiteboardCanvas from '../WhiteBoardCanvas-component/whiteBoardCanvas'; 

interface TaskFileProps {
  task: Task;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
  isSelected: boolean;
}

const TaskFile: React.FC<TaskFileProps> = ({ task, onUpdateTaskTitle, isSelected }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); 
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setEditableTitle(task.title);
  }, [task.title]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

 
  useEffect(() => {
    const updateSize = () => {
      if (contentRef.current) {
        const parentWidth = contentRef.current.offsetWidth;
        const parentHeight = contentRef.current.offsetHeight;
        setCanvasSize({ width: parentWidth > 0 ? parentWidth : 600, height: parentHeight > 0 ? parentHeight : 400 });
      }
    };

    if (isSelected) { // Solo calcular y renderizar el canvas si la tarea está seleccionada y visible
      updateSize();
      window.addEventListener('resize', updateSize); // Reajustar en resize
      return () => window.removeEventListener('resize', updateSize);
    } else {
      // Por ahora si no esta seleccionada, no se renderiza el canvas, aun no guardamos su estado.
    }
  }, [isSelected]);

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
        padding: '15px',
        margin: '10px',
        // minWidth: '300px', // Ajustar 
        // width: 'calc(100% - 20px)', // Ocupar el ancho disponible en MainContent
        // height: 'calc(100vh - 150px)', // Ocupar altura disponible, ajustar según header/footer
        backgroundColor: isSelected ? '#e7f3ff' : '#fff',
        boxShadow: isSelected ? '0 0 8px rgba(30, 144, 255, 0.5)' : '2px 2px 5px rgba(0,0,0,0.1)',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column', // Para organizar título y canvas verticalmente
        overflow: 'hidden', // Para que el canvas no desborde el TaskFile
        minHeight: '400px', // Darle una altura mínima
        width: '90vw', // Que ocupe gran parte del viewport
        maxWidth: '1200px', // Ancho máximo para evitar que se estire demasiado
        height: '80vh', // Altura
      }}
    >
      {/* Header con el título */}
      <div style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            style={{ fontSize: '1.5em', fontWeight: 'bold', width: '100%', border: '1px solid blue', padding: '5px' }}
          />
        ) : (
          <h3 onClick={handleTitleClick} style={{ cursor: 'pointer', margin: 0, fontSize: '1.5em', color: isSelected ? 'dodgerblue' : 'inherit' }}>
            {task.title}
          </h3>
        )}
      </div>

      {/* Contenedor del Canvas */}
      <div ref={contentRef} style={{ flexGrow: 1, position: 'relative', backgroundColor: 'white' /* Para el borrador */ }}>
        {isSelected && canvasSize.width > 0 && canvasSize.height > 0 && (
          <WhiteboardCanvas
            width={canvasSize.width}
            height={canvasSize.height}
            // Aquí pasarías datos guardados del canvas si los tuviera
            // initialData={task.canvasContent}
            // onDataChange={(data) => handleSaveCanvasData(task.id, data)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskFile;