import React, { useState } from 'react';
import TaskListDifficulties from '../components/TaskListDifficulties';
import './SettingsPopup.css';

const SettingsPopup = ({ onClose, setTasks }) => {
  const [favouriteSubject, setFavouriteSubject] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [taskDifficulties, setTaskDifficulties] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      const formData = new FormData();
      formData.append('favouriteSubject', favouriteSubject);
      formData.append('preferredTime', preferredTime);
      formData.append('taskDifficulties', JSON.stringify(taskDifficulties));

      const response = await fetch('/api/generate-study-plan', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate study plan');
      }

      const data = await response.json(); 
      




      return data;
    } catch (error) {
      console.error('Error generating study plan:', error);
      alert(error.message); 
    } finally {
      setIsLoading(false);
      onClose(); 
    }
  };

  const extractTasks = (data) => {
    try {
     
     
      if (Array.isArray(data.studyPlan)) {
        return data.studyPlan;
      }
    
      const studyPlanString = data.studyPlan.trim().replace(/\n/g, '');
      
      try {
        return JSON.parse(studyPlanString);
      } catch (parseError) {
        
        return eval(studyPlanString);
      }
    } catch (error) {
      console.error('Error extracting tasks:', error);
      return [];
    }
  };

  const handleTaskDifficultyChange = (taskId, difficulty) => {
    setTaskDifficulties((prevDifficulties) => ({ ...prevDifficulties, [taskId]: difficulty }));
  };

  return (
    <div className="settings-popup">
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const data = await handleSettingsSubmit(e);
          if (data) {
            
            let tasks = extractTasks(data);
            
            if (!Array.isArray(tasks)) {
              tasks = []; 
            }
            setTasks(tasks);
          }
        }} className="settings-form">
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