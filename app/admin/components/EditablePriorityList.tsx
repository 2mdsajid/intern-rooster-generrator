// app/admin/components/EditablePriorityList.tsx
'use client';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
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
    <div ref={setNodeRef} style={style} className="flex items-center bg-white p-3 my-1 rounded-md shadow-sm border touch-manipulation">
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing p-2 text-slate-500 hover:text-slate-700 touch-manipulation select-none"
        style={{ touchAction: 'none' }}
      >
        <GripVertical size={20} />
      </div>
      <span className="ml-3 text-slate-800 flex-1 select-none">{id}</span>
    </div>
  );
}

// Main component for the editable list
interface EditablePriorityListProps {
  items: string[];
  setItems: (items: string[]) => void;
}

export default function EditablePriorityList({ items, setItems }: EditablePriorityListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

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