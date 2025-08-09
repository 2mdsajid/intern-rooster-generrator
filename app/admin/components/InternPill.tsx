// app/admin/components/InternPill.tsx
'use client';
import { useDraggable } from '@dnd-kit/core';

interface InternPillProps {
  id: string;
  name: string;
  cellId: string; // <-- Add this prop
  onRemove: () => void;
}

export default function InternPill({ id, name, cellId, onRemove }: InternPillProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    // --- THIS IS THE FIX ---
    // We attach the cellId as data to the draggable item.
    data: {
      cellId: cellId,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-blue-100 text-blue-800 rounded px-2 py-1 my-1"
    >
      <span {...listeners} {...attributes} className="cursor-grab flex-grow">{name}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 text-blue-600 hover:text-blue-900"
        title="Remove Intern"
      >
        &times;
      </button>
    </div>
  );
}