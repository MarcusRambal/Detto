// src/components/WhiteboardCanvas.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Konva from 'konva'; // Importar Konva para tipos y utilidades si es necesario

interface WhiteboardCanvasProps {
  width: number;
  height: number;
  // En el futuro: initialData, onDataChange, etc.
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({ width, height }) => {
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen'); // Herramienta actual
  const [lines, setLines] = useState<Array<Konva.LineConfig>>([]); // Para guardar las líneas dibujadas
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  // Estado para el pan/zoom (simple)
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);


  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // Si la herramienta es 'pan' o si se presiona espacio (por ejemplo) podríamos iniciar el pan
    // Por ahora, solo dibujo
    isDrawing.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    // Ajustar por la posición y escala del stage para dibujar en coordenadas correctas
    const adjustedPos = {
      x: (pos.x - stagePos.x) / stageScale,
      y: (pos.y - stagePos.y) / stageScale,
    };

    setLines([
      ...lines,
      {
        points: [adjustedPos.x, adjustedPos.y, adjustedPos.x, adjustedPos.y], // Inicia y termina en el mismo punto
        stroke: tool === 'eraser' ? 'white' : 'black', // Color según herramienta
        strokeWidth: tool === 'eraser' ? 10 : 2,        // Ancho de línea
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        globalCompositeOperation: tool === 'eraser' ? 'destination-out' : 'source-over', // Efecto borrador
      },
    ]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

     // Ajustar por la posición y escala del stage
    const adjustedPos = {
      x: (pos.x - stagePos.x) / stageScale,
      y: (pos.y - stagePos.y) / stageScale,
    };

    const lastLine = lines[lines.length - 1];
    if (lastLine) {
      // Añadir nuevo punto a la línea actual
      lastLine.points = (lastLine.points || []).concat([adjustedPos.x, adjustedPos.y]);

      // Actualizar el array de líneas
      const newLines = [...lines]; // Crear una nueva copia superficial
      newLines.splice(lines.length - 1, 1, lastLine); // Reemplazar la última línea
      setLines(newLines);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // Manejo básico de la rueda del ratón para zoom
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault(); // Prevenir el scroll de la página
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // cómo zoomear? depende de la dirección del scroll del ratón
    const direction = e.evt.deltaY > 0 ? -1 : 1; // -1 para zoom out, 1 para zoom in

    // Factor de zoom, puedes ajustarlo
    const scaleBy = 1.1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Limitar el zoom si es necesario
    // if (newScale < 0.1 || newScale > 10) return;

    setStageScale(newScale);
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setStagePos(newPos);
  };


  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setTool('pen')} disabled={tool === 'pen'}>Lápiz</button>
        <button onClick={() => setTool('eraser')} disabled={tool === 'eraser'}>Borrador</button>
        {/* Aquí podrías añadir más herramientas, colores, etc. */}
      </div>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // También terminar de dibujar si el mouse sale del canvas
        draggable // Habilitar el arrastre del Stage (pan)
        onDragEnd={(e) => setStagePos({ x: e.target.x(), y: e.target.y() })}
        onWheel={handleWheel}
        x={stagePos.x}
        y={stagePos.y}
        scaleX={stageScale}
        scaleY={stageScale}
        style={{ border: '1px solid #ccc', backgroundColor: 'white' }} // Fondo blanco para el borrador
      >
        <Layer>
          {/* Ejemplo de un fondo si lo necesitas (para que el borrador funcione visualmente) */}
          {/* <Rect x={0} y={0} width={width * 2} height={height*2} fill="white" />  // Un rect muy grande si el canvas es "infinito"*/}
          {lines.map((line, i) => (
            <Line key={i} {...line} />
          ))}
          {/* Aquí se podrían añadir otras formas: Rect, Circle, Text, Image, etc. */}
        </Layer>
      </Stage>
    </div>
  );
};

export default WhiteboardCanvas;