import React, { useState } from 'react';
import Task from './Task';
import './Task.css';
function TaskList({ onTaskExpire }) {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Microbiology Lab Report', anotherText: '02/15/25', timeText: '12:00', descriptionText: 'Analyze bacterial colony growth and submit the associated lab report.', subjectText: 'Microbiology', completed: false, expired: false },
        { id: 2, text: 'Genetics Problem Set', anotherText: '02/15/25', timeText: '15:00', descriptionText: 'Complete Mendelian inheritance problems.', subjectText: 'Genetics', completed: false, expired: false },
        { id: 3, text: 'Physiology Quiz', anotherText: '02/15/25', timeText: '18:30', descriptionText: 'Complete an online quiz on the Peripheral Nervous System.', subjectText: 'Human Physiology', completed: false, expired: false },
        { id: 4, text: 'Ecology Research Paper', anotherText: '02/15/25', timeText: '23:59', descriptionText: 'Submit a research paper on the ecological impacts of invasive species.', subjectText: 'Ecology', completed: false, expired: false },
        { id: 5, text: 'Evolutionary Biology Presentation', anotherText: '02/16/25', timeText: '08:45', descriptionText: 'Prepare slides on natural selection and adaptation.', subjectText: 'Evolutionary Biology', completed: false, expired: false },
        { id: 6, text: 'Biochemistry Lab Notes Submission', anotherText: '02/16/25', timeText: '09:30', descriptionText: 'Ensure all enzyme kinetics lab notes are complete.', subjectText: 'Biochemistry', completed: false, expired: false },
        { id: 7, text: 'Molecular Biology Final Project', anotherText: '02/16/25', timeText: '23:59', descriptionText: 'Submit the final project on gene expression analysis.', subjectText: 'Molecular Biology', completed: false, expired: false }

    ]);
    const [text, setText] = useState('');
    const [anotherText, setAnotherText] = useState('');
    const [timeText, setTimeText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }
    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                onTaskExpire();
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    }
    function expireTask(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                onTaskExpire();
                return { ...task, expired: true, completed: false };
            }
            return task;
        }));
    }
    const ongoingTasks = tasks.filter(task => !task.completed && !task.expired);
    const expiredTasks = tasks.filter(task => task.expired);
    const completedTasks = tasks.filter(task => task.completed);
    return (
        <div className="task-list p-4 bg-white rounded-lg">
            <div className="task-list-container">
                {ongoingTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                        expireTask={expireTask}
                    />
                ))}
                {expiredTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                        expireTask={expireTask}
                    />
                ))}
                {completedTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                        expireTask={expireTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
