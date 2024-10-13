import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './components/Column';
import CaloriesBurned from './components/CaloriesBurned';
import { AppState, Exercise } from './types';
import { Dumbbell } from 'lucide-react';

const initialState: AppState = {
  exercises: {
    'exercise-1': { id: 'exercise-1', name: 'Push-ups', muscleGroup: 'Chest', reps: 10, sets: 3 },
    'exercise-2': { id: 'exercise-2', name: 'Squats', muscleGroup: 'Legs', reps: 12, sets: 3 },
    'exercise-3': { id: 'exercise-3', name: 'Pull-ups', muscleGroup: 'Back', reps: 8, sets: 3 },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'Monday', exerciseIds: ['exercise-1'] },
    'column-2': { id: 'column-2', title: 'Tuesday', exerciseIds: ['exercise-2'] },
    'column-3': { id: 'column-3', title: 'Wednesday', exerciseIds: ['exercise-3'] },
    'column-4': { id: 'column-4', title: 'Thursday', exerciseIds: [] },
    'column-5': { id: 'column-5', title: 'Friday', exerciseIds: [] },
    'column-6': { id: 'column-6', title: 'Saturday', exerciseIds: [] },
    'column-7': { id: 'column-7', title: 'Sunday', exerciseIds: [] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7'],
};

function App() {
  const [state, setState] = useState<AppState>(initialState);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newExerciseIds = Array.from(start.exerciseIds);
      newExerciseIds.splice(source.index, 1);
      newExerciseIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        exerciseIds: newExerciseIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startExerciseIds = Array.from(start.exerciseIds);
    startExerciseIds.splice(source.index, 1);
    const newStart = {
      ...start,
      exerciseIds: startExerciseIds,
    };

    const finishExerciseIds = Array.from(finish.exerciseIds);
    finishExerciseIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      exerciseIds: finishExerciseIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  const calculateCaloriesBurned = (): number => {
    // Simple calculation for demonstration purposes
    return Object.values(state.exercises).reduce((total, exercise) => {
      return total + exercise.reps * exercise.sets * 5; // Assuming 5 calories per rep
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center">
          <Dumbbell className="w-10 h-10 mr-2" />
          Exercise Planner
        </h1>
        <p className="text-gray-600 mt-2">Plan your workouts for the week</p>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const exercises = column.exerciseIds.map(
              (exerciseId) => state.exercises[exerciseId]
            );

            return <Column key={column.id} column={column} exercises={exercises} />;
          })}
        </div>
      </DragDropContext>
      <div className="flex justify-center">
        <CaloriesBurned calories={calculateCaloriesBurned()} />
      </div>
    </div>
  );
}

export default App;