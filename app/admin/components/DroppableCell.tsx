// app/admin/components/DroppableCell.tsx
'use client';
import { useDroppable } from '@dnd-kit/core';

export default function DroppableCell({ id, children }: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    border: '1px dashed #cbd5e1',
    backgroundColor: isOver ? '#eff6ff' : 'transparent', // Highlight on hover
    minHeight: '48px',
  };

  return (
    <td
      ref={setNodeRef}
      style={style}
      className="px-2 py-1 whitespace-nowrap text-sm text-gray-800 align-top"
    >
      {children}
    </td>
  );
}