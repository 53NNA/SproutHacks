import React from 'react';
import './Task.css';
const Task = ({ task, deleteTask, toggleCompleted, expireTask }) => {
    return (
        <div className={`task-container ${task.completed ? 'completed' : task.expired ? 'expired' : 'ongoing'}`}>
            <div className="task-header">
                <div className="flex items-center gap-2">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompleted(task.id)} 
                        />
                        <span className="checkmark"></span>
                    </label>
                    <span className={`task-text ${task.completed ? 'text-gray-500' : ''}`}>
                        {task.text}
                    </span>
                   
                    {!task.expired && (
                        <button onClick={() => expireTask(task.id)} className="expire-button">Expire</button>
                    )}
                </div>
            </div>
            <div className="task-details">
                <span className="task-date">{task.anotherText}</span>
                <span className="task-time">{task.timeText}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="subject-text">{task.subjectText}</span> 
                <span className={`task-status ${task.completed ? 'completed' : task.expired ? 'expired' : ''}`}>
                    {task.completed ? 'Completed' : task.expired ? 'Expired' : 'Ongoing'}
                </span>
            </div>
            <span className="task-description">{task.descriptionText}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-button">
                ⓧ
            </button>
        </div>
    );
};

export default Task;