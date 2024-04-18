import React, { Component, useEffect, useState } from 'react';
import './SidePanel.css';
import Header from './Header';
import Content from './Content';

function SidePanel() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

export default SidePanel;
