import { useEffect, useState } from 'react';

function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('http://localhost:3001/api/exercises');
      const data = await response.json();
      setExercises(data);
    };
    fetchExercises();
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Exercises;
