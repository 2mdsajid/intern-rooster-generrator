// app/admin/components/EditableCell.tsx
'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditableCellProps {
  id: string;
  interns: string[];
}

export default function EditableCell({ id, interns }: EditableCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: '1px dashed #cbd5e1', // Add a visual cue for droppable areas
    minHeight: '40px', // Ensure empty cells are droppable
  };

  return (
    <td
      ref={setNodeRef}
      style={style}
      className="px-4 py-2 whitespace-nowrap text-sm text-gray-800"
    >
      {interns.map((intern, index) => (
        <div 
          key={intern} 
          {...attributes} 
          {...listeners} 
          className="bg-blue-100 text-blue-800 rounded px-2 py-1 my-1 cursor-grab"
        >
          {intern}
        </div>
      ))}
    </td>
  );
}