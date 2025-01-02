import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
}

export function TaskColumn({ status, title }: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.status === status)
  );

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[500px] p-4 bg-gray-50 rounded-lg ${
        isOver ? 'bg-gray-100' : ''
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}