import React from 'react';
import './TaskListDifficulties.css';

const TaskListDifficulties = ({ tasks, difficulties, onChange }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-difficulty-item">
          <h4>{task.text}</h4>
          <div className="difficulty-options">
            <label>
              <input
                type="radio"
                name={`difficulty-${task.id}`}
                value="easy"
                checked={difficulties[task.id] === 'easy'}
                onChange={() => onChange(task.id, 'easy')}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name={`difficulty-${task.id}`}
                value="medium"
                checked={difficulties[task.id] === 'medium'}
                onChange={() => onChange(task.id, 'medium')}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name={`difficulty-${task.id}`}
                value="difficult"
                checked={difficulties[task.id] === 'difficult'}
                onChange={() => onChange(task.id, 'difficult')}
              />
              Difficult
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListDifficulties;