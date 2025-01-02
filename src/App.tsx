import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { TaskColumn } from './components/TaskColumn';
import { AddTaskDialog } from './components/AddTaskDialog';
import { useTaskStore } from './store/useTaskStore';

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn status="todo" title="To Do" />
            <TaskColumn status="in-progress" title="In Progress" />
            <TaskColumn status="completed" title="Completed" />
          </div>
        </DndContext>

        <AddTaskDialog
          isOpen={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;