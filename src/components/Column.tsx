import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import ExerciseCard from './ExerciseCard';
import { Column as ColumnType, Exercise } from '../types';

interface ColumnProps {
  column: ColumnType;
  exercises: Exercise[];
}

const Column: React.FC<ColumnProps> = ({ column, exercises }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-bold mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {exercises.map((exercise, index) => (
              <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;