import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { format } from 'date-fns';
import { Calendar, Flag } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {format(task.dueDate, 'MMM d')}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
          <div className="flex items-center space-x-1">
            <Flag className="w-3 h-3" />
            <span>{task.priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
}