// app/admin/components/EditablePriorityList.tsx
'use client';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

// Sub-component for each item in the list
function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center bg-white p-2 my-1 rounded-md shadow-sm border">
      <div {...listeners} {...attributes} className="cursor-grab p-1 text-slate-500">
        <GripVertical size={18} />
      </div>
      <span className="ml-2 text-slate-800">{id}</span>
    </div>
  );
}

// Main component for the editable list
interface EditablePriorityListProps {
  items: string[];
  setItems: (items: string[]) => void;
}

export default function EditablePriorityList({ items, setItems }: EditablePriorityListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {items.map(item => <SortableItem key={item} id={item} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
}