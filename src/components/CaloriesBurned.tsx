import React from 'react';
import { Flame } from 'lucide-react';

interface CaloriesBurnedProps {
  calories: number;
}

const CaloriesBurned: React.FC<CaloriesBurnedProps> = ({ calories }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <Flame className="w-6 h-6 mr-2 text-red-500" />
      <div>
        <h3 className="text-lg font-semibold">Calories Burned</h3>
        <p className="text-2xl font-bold">{calories} kcal</p>
      </div>
    </div>
  );
};

export default CaloriesBurned;