// src/components/TaskEditor.tsx
import type {Task} from '../leftBar-component/LeftBar';
import './TaskEditor.css';

interface TaskEditorProps {
  task: Task | null;
}

export default function TaskEditor({ task }: TaskEditorProps) {
  if (!task) {
    return (
      <div className="task-editor placeholder">
        <p>Selecciona una tarea de la lista para ver sus detalles.</p>
      </div>
    );
  }

  return (
    <div className="task-editor">
      <div className="editor-tab">
        <span>{task.name}</span> 
      </div>

      <div className="editor-content">
        <h2>{task.name}</h2>
        <hr />

        <div className="task-details">
            <label htmlFor="taskDescription">Descripción:</label>
            <textarea
                id="taskDescription"
                placeholder="Añade una descripción..."
                rows={5}
                defaultValue={"Esta es la descripción de la tarea..."} 
            />

            <p><strong>ID:</strong> {task.id}</p>

        </div>
      </div>
    </div>
  );
}