import React from 'react';
import './CalendarPopup.css';

const CalendarPopup = ({ tasks = [], onClose }) => {
  

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const getTasksForHour = (hour) => {
    if (!Array.isArray(tasks)) {
      console.error('Tasks is not an array:', tasks);
      return [];
    }
    return tasks.filter(task => task.time === hour);
  };

  return (
    <div className="calendar-popup">
      <div className="calendar-container">
        <h2 className="calendar-title">Daily Planner</h2>
        <div className="calendar-content">
          {hours.map((hour) => (
            <div key={hour} className="calendar-hour">
              <span className="calendar-time">{hour}</span>
              <div className="calendar-block">
                {getTasksForHour(hour).map(task => (
                  <div key={task.task} className="calendar-task">
                    {task.task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="calendar-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CalendarPopup;