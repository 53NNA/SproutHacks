import React, { useState } from 'react';
import TaskListDifficulties from '../components/TaskListDifficulties';
import './SettingsPopup.css';

const SettingsPopup = ({ onClose }) => {
  const [favouriteSubject, setFavouriteSubject] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [taskDifficulties, setTaskDifficulties] = useState({});

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    console.log('Settings submitted:', favouriteSubject, preferredTime, taskDifficulties);
    onClose();
  };

  const handleTaskDifficultyChange = (taskId, difficulty) => {
    setTaskDifficulties((prevDifficulties) => ({ ...prevDifficulties, [taskId]: difficulty }));
  };

  return (
    <div className="settings-popup">
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>
        <form onSubmit={handleSettingsSubmit} className="settings-form">
          <div className="settings-field">
            <label className="settings-label" htmlFor="favouriteSubject">Favourite Subject:</label>
            <input
              type="text"
              value={favouriteSubject}
              onChange={(e) => setFavouriteSubject(e.target.value)}
              className="settings-input"
            />
          </div>
          <div className="settings-field">
            <label className="settings-label" htmlFor="preferredTime">Preferred Working Time (HH:MM):</label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="settings-input"
            />
          </div>
          <h3 className="settings-subtitle">Task Difficulties:</h3>
          <TaskListDifficulties
            tasks={[
              { id: 1, text: 'Microbiology Lab Report' },
              { id: 2, text: 'Genetics Problem Set' },
              { id: 3, text: 'Physiology Quiz' },
              { id: 4, text: 'Ecology Research Paper' },
              { id: 5, text: 'Evolution Essay' },
              { id: 6, text: 'Biology Lab Report' },
              { id: 7, text: 'Chemistry Problem Set' },
            ]}
            difficulties={taskDifficulties}
            onChange={handleTaskDifficultyChange}
          />
          <button type="submit" className="settings-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPopup;