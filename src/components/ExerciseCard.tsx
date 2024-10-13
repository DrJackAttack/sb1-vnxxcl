import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Exercise } from '../types';
import { Dumbbell } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-2">
            <Dumbbell className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
          </div>
          <p className="text-sm text-gray-600">Muscle Group: {exercise.muscleGroup}</p>
          <p className="text-sm text-gray-600">
            {exercise.sets} sets x {exercise.reps} reps
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseCard;