// Puedes crear este componente en el mismo archivo o en uno nuevo (e.g., ContextMenu.tsx)

export interface TaskMenuProps {
    position: { x: number; y: number };
    onDelete: () => void; // Función a llamar al hacer clic en Delete
    onDismiss: () => void; // Función para cerrar el menú (opcional, se usa con click fuera)
  }
  
export default function TaskMenu({ position, onDelete, onDismiss }: TaskMenuProps) {
    const menuStyle: React.CSSProperties = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`,
      zIndex: 1000, 
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '5px 0',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
    };
  
    const menuItemStyle: React.CSSProperties = {
       padding: '8px 15px',
       cursor: 'pointer',
    }
  
    const handleMouseLeave = () => {
        onDismiss();
    }
  
    return (
      <div style={menuStyle} onMouseLeave={handleMouseLeave}>
        <ul>
            <li style={menuItemStyle} onClick={onDelete}>
              Eliminar Tarea
            </li>
            {/* Puedes añadir más opciones aquí (Editar, Marcar como completada, etc.) */}
        </ul>
      </div>
    );
  }