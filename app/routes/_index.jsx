import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import settingsIcon from '/Users/sennageorge/Pokemon-Game/ellehacks/ellehacks/app/images/icon123.png';
import timeLeft from '/Users/sennageorge/Pokemon-Game/ellehacks/ellehacks/app/images/timeleft.png';
export const meta = () => {
  return [
    { title: "Task Overview" }
  ];
};
export default function Index() {
  const [currentImage, setCurrentImage] = useState(0); 
  const [isMorphing, setIsMorphing] = useState(false); 
  const images = [
    'app/images/s1.svg',
    'app/images/s2.svg',
    'app/images/s3.svg',
    'app/images/s4.svg',
    'app/images/s5.svg',
    'app/images/s6.svg',
    'app/images/s7.svg',
    'app/images/s8.svg',
  ];
  const handleTaskExpire = () => {
    setIsMorphing(true); 
    setCurrentImage((prev) => (prev + 1) % images.length);
    setTimeout(() => {
      setIsMorphing(false);
    }, 500); 
  };

  return (
    <div className="flex h-screen relative"> 
      <div className="w-3/5 p-8 border-r">
        <div className="flex items-center mb-4">
          <h1 className="text-5xl font-bold text-green-700 mr-3">Dashboard | </h1>
          <h2 className="text-4xl font-normal text-green-800">Flourish</h2>
        </div>
        <TaskList onTaskExpire={handleTaskExpire} />
      </div>

      {/* Right section image display for the plant 2/3 of the screen or  something*/}
      <div className="w-2/3 bg-white-100 flex justify-center items-center">
        <div className="morph-container">
          <img
            src={images[currentImage]}
            className={`morph-image ${isMorphing ? 'morph' : ''}`} 
            alt="Plant Growth"
          />
        </div>
      </div>
      <img
        src={settingsIcon}
        alt="Settings"
        className="absolute top-8 right-8 w-12 h-12 cursor-pointer" 
      />
      <img
        src={timeLeft}
        alt="Settings"
        className="absolute bottom-8 right-8 w-12 h-12 cursor-pointer" 
      />
      <div className="absolute top-8 right-32 flex items-center"> 
        <h3 className="text-4xl font-normal text-green-800 mr-3">Biology Department</h3>
        <h3 className="text-5xl font-bold text-green-700"> | Sproutelle</h3>
      </div>
      <div className="absolute bottom-8 right-32 flex items-center">
        <h3 className="text-3xl font-normal text-neutral-500 mr-3">Current Datetime: </h3>
        <h3 className="text-3xl font-normal text-neutral-400">02/15/25 | 13:45:00</h3>
      </div>
    </div>
  );
}