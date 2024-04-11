import React, { Component, useEffect } from 'react';
import './SidePanel.css';
import Header from './Header';
import Content from './Content';

function SidePanel() {
    useEffect(() => {
        console.log("SIDE BAR OPENED")
    }, [])
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

export default SidePanel;
