export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  reps: number;
  sets: number;
}

export interface Column {
  id: string;
  title: string;
  exerciseIds: string[];
}

export interface AppState {
  exercises: { [key: string]: Exercise };
  columns: { [key: string]: Column };
  columnOrder: string[];
}