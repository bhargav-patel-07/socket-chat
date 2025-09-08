import React, { useState } from 'react';
const Switch = ({ isOn, handleToggle }) => {
    const switchContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '10px 0',
    };
  
    const switchStyle = {
      cursor: 'pointer',
      width: '60px',
      height: '30px',
      position: 'relative',
      display: 'inline-block',
    };
  
    const sliderStyle = {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: '.4s',
      borderRadius: '34px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: isOn ? '#4CAF50' : '#ccc',
      transform: isOn ? 'translateX(0)' : 'translateX(30px)',
    };
  
    const switchTextStyle = {
      userSelect: 'none',
    };
  
    const labelStyle = {
      fontSize: '14px',
      color: '#666',
    

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="switch-container">
      <span className="switch-label">AI Assistant</span>
      <div className="switch" onClick={handleToggle}>
        <div className={`slider ${isOn ? 'on' : 'off'}`}>
          <div className="switch-text">{isOn ? 'ON' : 'OFF'}</div>
        </div>
      </div>
    </div>
  );
};
    };

export default Switch;