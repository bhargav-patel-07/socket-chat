import React from 'react';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <div className="switch-container" onClick={handleToggle}>
        <span className="switch-label">AI Assistant</span>
        <div className={`switch ${isOn ? 'on' : ''}`}>
          <div className="slider"></div>
        </div>
      </div>
      <style jsx>{`
        .switch-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 10px;
          margin-bottom: 10px;
        }
        .switch-label {
          font-weight: bold;
          color: #ccc;
        }
        .switch {
          width: 50px;
          height: 28px;
          background-color: #ccc;
          border-radius: 14px;
          position: relative;
          transition: background-color 0.3s;
        }
        .switch.on {
          background-color: #4CAF50;
        }
        .slider {
          width: 24px;
          height: 24px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
        }
        .switch.on .slider {
          transform: translateX(22px);
        }
      `}</style>
    </>
  );
};   

export default Switch;