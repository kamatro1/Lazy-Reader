import React, { Component, useEffect, useState } from 'react';
import './SidePanel.css';
import Header from './Header';
import Content from './Content';

function SidePanel() {
  const [summaryText, setSummaryText] = useState<string>('');

  return (
    <div>
      <Header setSummaryText={setSummaryText}/>
      <Content summaryText={summaryText}/>
    </div>
  );
}

export default SidePanel;
